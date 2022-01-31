/* global BigInt */
import { globalState, setGlobalState, setGlobalStateFull, initialState, getInitialState, setInitialState, mergeObjects, doNav} from "./state.js"
import { api_fight, fight_stepper } from "./api.js"

var nearlib = window.nearApi;
var nacl = window.nacl;

const KEY_UNIQUE_PREFIX = '_4:'
const KEY_WALLET_ACCOUNTS = KEY_UNIQUE_PREFIX + 'wallet:accounts_v2'
const KEY_ACTIVE_ACCOUNT_ID = KEY_UNIQUE_PREFIX + 'wallet:active_account_id_v2'

const BOATLOAD_OF_GAS = "300000000000000";
//const BOATLOAD_OF_GAS = "100000000000000";
const ONE_NEAR = "1000000000000000000000000";

var NEAR_URL = "https://rpc.mainnet.near.org"
var CONTRACT_NAME = "nearknights.near"
const TESTNET = true;
if (TESTNET) {
  NEAR_URL = "https://rpc.testnet.near.org"
  //NEAR_URL = "https://validator-testnet.zod.tv:3030"
  CONTRACT_NAME = "nearknights.testnet"
}

var nearConfig = {
  networkId: TESTNET ? 'testnet' : 'mainnet',
  contractName: CONTRACT_NAME,
  nodeUrl: NEAR_URL,
  walletUrl: TESTNET ? `https://wallet.testnet.near.org` : 'https://wallet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  explorerUrl: 'https://explorer.near.org',
};
window.nearConfig = nearConfig;

export function near_login() {
    window.walletConnection.requestSignIn(
      // The contract name that would be authorized to be called by the user's account.
      window.nearConfig.contractName,
      // This is the app name. It can be anything.
      'NEAR Knights',
      window.location.href
    );
}
window.near_login = near_login;

function near_logout() {
  window.walletConnection.signOut();
  window.location = "/"
}

function near_logged_in() {
    return window.walletConnection.isSignedIn();
}
window.near_logged_in = near_logged_in;

function near_login_token() {
  var account_id = window.accountId;
  var keypair_ed = getKeyPairs();
  var public_key_b58 = window.nearApi.utils.serialize.base_encode(keypair_ed.publicKey)
  var epoch = Math.floor((new Date).getTime()/1000)
  var obj = {provider: "near", account: account_id, public_key_b58: public_key_b58, epoch: epoch}
  var json = JSON.stringify(obj)
  var message = (new TextEncoder()).encode(json)
  var signature = nacl.sign.detached(message, keypair_ed.secretKey)
  signature = window.nearApi.utils.serialize.base_encode(signature)

  return window.nearApi.utils.serialize.base_encode((new TextEncoder()).encode(json+"."+signature))
}
window.near_login_token = near_login_token;

function getKeyPairs() {
  var my_privKey = localStorage.getItem(`near-api-js:keystore:${window.accountId}:mainnet`);
  if (!my_privKey)
    my_privKey = localStorage.getItem(`near-api-js:keystore:${window.accountId}:testnet`);
  my_privKey = my_privKey.replace("ed25519:", "");
  const privKey_ed25519_uint8 = window.nearApi.utils.serialize.base_decode(my_privKey);
  const keyPair_ed = nacl.sign.keyPair.fromSecretKey(privKey_ed25519_uint8);
  return keyPair_ed;
}

export async function initContract() {
  window.provider = new nearlib.providers.JsonRpcProvider(nearConfig.nodeUrl);

  // Initializing connection to the NEAR DevNet.
  window.near = await nearlib.connect({
    deps: { keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore() },
    ...nearConfig });

  window.nk_account = await window.near.account(CONTRACT_NAME)

  const walletConnection = new nearlib.WalletConnection(window.near);
  window.walletConnection = walletConnection;

  const accountId = walletConnection.getAccountId();
  window.accountId = accountId;

  // Initializing our contract APIs by contract name and configuration.
  window.contract = await new nearlib.Contract(walletConnection.account(), nearConfig.contractName, {
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ["nft_for_sale", "nft_for_sale_all", "hero"],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: [
      "fix",
      "nft_market_sell", "nft_market_buy", "nft_market_cancel", 
      "create_knight", "battle", "revive", "equip_item",
      "stat_add", "stat_preview", "stat_reset",
      "gacha_pull", "equip_polymorph",
      "shop_buy_gold", "shop_buy"],
    sender: walletConnection.getAccountId(),
  });

  if (accountId) {
    window.account = walletConnection.account();
    var balance = (await window.account.getAccountBalance()).available;
    var {itemsMarket, itemsAvailable, itemsActive, itemsEquipped, gachas} = await near_refresh_ah_1(accountId)
    var hero = await nk_hero()
    console.log(hero)
    setGlobalState({
        accountId: accountId,
        balance: balance,
        hero: hero,
        auction: {
          query: itemsMarket,
          items: itemsAvailable,
          active: itemsActive,
          equipped: itemsEquipped,
          gacha: gachas
        }
    });
  } else {
    var itemsMarket = await near_refresh_item_market_guest();
    setGlobalState({
        auction: {
          query: itemsMarket,
        }
    });
  }
}

export async function near_refresh_balance() {
    var balance = (await window.account.getAccountBalance()).available;
    setGlobalState({
        balance: balance
    });
}

export async function near_refresh_ah() {
  var accountId = globalState.accountId;
  var {itemsMarket, itemsAvailable, itemsActive, itemsEquipped, gachas} = await near_refresh_ah_1(accountId)
  setGlobalState({
      auction: {
        query: itemsMarket,
        items: itemsAvailable,
        active: itemsActive,
        equipped: itemsEquipped,
        gacha: gachas
      }
  });
}

export async function near_refresh_item_market_guest() {
  var market = await window.nk_account.viewState("itemMarket::", {finality: "final"})

  var itemsMarket = market.map((pair)=> {
    var json = (new TextDecoder()).decode(pair.value)
    return JSON.parse(json);
  })
  return itemsMarket;
}

export async function near_refresh_ah_1(accountId) {
  var market = window.nk_account.viewState("itemMarket::", {finality: "final"})
  var equipped = window.nk_account.viewState(`equippedBySlot::${accountId}::`, {finality: "final"})
  var count_mapping = window.nk_account.viewState(`accountToItemsCount::${accountId}::`, {finality: "final"})
  var available = window.nk_account.viewState(`_vectoraccountToItems::${accountId}::`, {finality: "final"})
  var gachas = nk_gachas(accountId)

  equipped = await equipped
  var itemsEquipped = equipped.map((pair)=> {
    var slot = (new TextDecoder()).decode(pair.key).replace(`equippedBySlot::${accountId}::`, "")
    var token_id = JSON.parse((new TextDecoder()).decode(pair.value))
    return {index: Number(token_id), slot: slot};
  })

  count_mapping = await count_mapping
  count_mapping = count_mapping.reduce((map, pair)=> {
    var key = (new TextDecoder()).decode(pair.key).replace(`accountToItemsCount::${accountId}::`, "")
    var count = JSON.parse((new TextDecoder()).decode(pair.value))
    map[key] = Number(count);
    return map;
  }, {})

  available = await available
  var itemsAvailable = available.map((pair)=> {
    var key = (new TextDecoder()).decode(pair.key)
    if (key == `_vectoraccountToItems::${accountId}::len`) {
      return null;
    }
    var token_id = JSON.parse((new TextDecoder()).decode(pair.value))
    return {index: Number(token_id), count: count_mapping[token_id]};
  })
  itemsAvailable = itemsAvailable.filter(i=> i)

  market = await market
  var itemsMarket = market.map((pair)=> {
    var json = (new TextDecoder()).decode(pair.value)
    return JSON.parse(json);
  })
  var itemsActive = itemsMarket.filter(i=> i.owner_id == accountId)
  //itemsMarket = itemsMarket.filter(i=> i.owner_id != accountId)

  gachas = await gachas
  console.log({itemsActive, itemsMarket, itemsAvailable, itemsEquipped, gachas})
  return {itemsActive, itemsMarket, itemsAvailable, itemsEquipped, gachas}
}

export async function nft_market_sell(index, price, amount) {
    var index = index.toString()
    var sale_id = await window.contract.nft_market_sell({index: index, price: price, amount: amount.toString()});
    let items = globalState.auction.items
    var item = items.find(i=> i.index == Number(index))
    item.count -= amount
    if (item.count <= 0) {
      items = items.filter(i=> i.index != Number(index))
    }

    var active_item = {sale_id: sale_id, index: item.index, price: price, amount: amount}
    
    var itemsActive = globalState.auction.active.slice()
    itemsActive.push(active_item)
    
    console.log(items, itemsActive)
    setGlobalState({
        auction: {
          items: items,
          active: itemsActive,
        }
    });
}

export async function nft_market_cancel(sale_id) {
    var sale_id = sale_id.toString()
    var res = await window.contract.nft_market_cancel({sale_id: sale_id});
    var sale = globalState.auction.active.find(i=> i.sale_id == sale_id)
    var itemsActive = globalState.auction.active.filter(i=> i.sale_id != sale_id)

    let items = globalState.auction.items
    var item = items.find(i=> i.index == Number(sale.index))
    if (!item) {
      items.push({index: Number(sale.index), count: Number(sale.amount)})
    } else {
      item.count += Number(sale.amount)
    }
    
    console.log(itemsActive, items)
    setGlobalState({
        auction: {
          items: items,
          active: itemsActive,
        }
    });
}
window.nft_market_cancel = nft_market_cancel;

export async function nft_market_buy(sale_id, near_price) {
    var sale_id = sale_id.toString()
    var res = await window.contract.nft_market_buy({sale_id: sale_id}, BOATLOAD_OF_GAS, near_price);
    
    var sale = globalState.auction.query.find(i=> i.sale_id == sale_id)
    let items = globalState.auction.items
    var item = items.find(i=> i.index == Number(sale.index))
    if (!item) {
      items.push({index: Number(sale.index), count: Number(sale.amount)})
    } else {
      item.count += Number(sale.amount)
    }

    var active = globalState.auction.active.filter(i=> i.sale_id != sale_id)
    var itemsMarket = globalState.auction.query.filter(i=> i.sale_id != sale_id)

    console.log(items)
    setGlobalState({
        auction: {
          query: itemsMarket,
          items: items,
          active: active,
        }
    });
}

export async function nk_battle(location, count) {
    console.log("battle", location, count)
    var str_steps = null;
    const old_log = console.log;
    {
      const log = console.log.bind(console)
      console.log = (args) => {
        log(args)
        try {
          if (args.startsWith("\tLog [")) {
            var [a,b] = args.split(":")
            str_steps = b;
          }
        } catch(err) {}
      }
    }

    var res = await window.contract.battle({location: location, count: count}, BOATLOAD_OF_GAS);
    //console.log.bind(old_log)
    if (str_steps == null) {
      alert("combat horribly wrong")
      return
    }
    return parse_log_steps(str_steps)
}

function parse_log_steps(str_steps) {
  let acts = str_steps.split(";").filter(e=> e != "")
  var steps = acts.map(a => {
    var [op,a,b,c] = a.trim().split(" ")
    if (op == "am") {
      return {action: "appear_mob", "id": Number(a), "hp": Number(b), tick: Number(c)}
    }
    if (op == "sc") {
      return {action: "slash_char", type: a, "dam": Number(a), tick: Number(b)}
    }
    if (op == "sm") {
      return {action: "slash_mob", type: a, "dam": Number(a), tick: Number(b)}
    }
    if (op == "dm") {
      return {action: "dead_mob", tick: Number(a)}
    }
    if (op == "dc") {
      return {action: "dead_char", tick: Number(a)}
    }
    if (op == "gg") {
      return {action: "gain_gold", amount: Number(a), tick: 0}
    }
    if (op == "gd") {
      return {action: "gain_diamond", amount: Number(a), tick: 0}
    }
    if (op == "ge") {
      return {action: "gain_exp", amount: Number(a), tick: 0}
    }
    if (op == "gi") {
      return {action: "gain_item", id: Number(a), amount: Number(b), tick: 0}
    }
    if (op == "lvl") {
      return {action: "level", amount: Number(a), tick: 0}
    }
    if (op == "h") {
      return {action: "heal", type: a, amount: Number(b), tick: Number(c)}
    }
    throw {error: op}
  })
  return steps
}

export async function nk_revive() {
    var res = await window.contract.revive({}, BOATLOAD_OF_GAS);
    return res;
}

export async function nk_create_knight() {
    var hero = await window.contract.create_knight({}, BOATLOAD_OF_GAS);
    return hero;
}

export async function nk_hero() {
    var res = await window.contract.hero({accountId: window.accountId});
    return res;
}
window.nk_hero = nk_hero

export async function nk_shop_buy_gold(count) {
    let near = (BigInt(ONE_NEAR) * BigInt(count)).toString()
    var res = await window.contract.shop_buy_gold({accountId: window.accountId, stack_count: count}, BOATLOAD_OF_GAS, near);
    return res;
}
window.nk_shop_buy_gold = nk_shop_buy_gold

export async function nk_shop_buy(index, attach_near) {
    let near = (BigInt(ONE_NEAR) * BigInt(attach_near)).toString()

    var str_steps = null;
    const old_log = console.log;
    {
      const log = console.log.bind(console)
      console.log = (args) => {
        log(args)
        try {
          if (args.startsWith("\tLog [")) {
            var [a,b] = args.split(":")
            str_steps = b;
          }
        } catch(err) {}
      }
    }

    var res = await window.contract.shop_buy({index: index}, BOATLOAD_OF_GAS, near);
    var state_transform = parse_log_steps(str_steps)
    console.log(state_transform)
    await fight_stepper(state_transform)
    return res;
}
window.nk_shop_buy = nk_shop_buy

export async function nk_equip_item(index, slot) {
    console.log(index, slot)
    var hero = await window.contract.equip_item({index: `${index}`});

    let equipped = [...globalState.auction.equipped]
    .filter(e=> e.index != Number(hero.extra1))
    //we deequip here
    if (!globalState.auction.equipped.find(e=> e.index == index)) {
      equipped.push({index: index, slot: slot})
    }

    setGlobalState({hero: hero, auction: {equipped: equipped}})

    return hero;
}
window.nk_equip_item = nk_equip_item

export async function nk_stat_add(stat) {
    var hero = await window.contract.stat_add({stat: stat});
    setGlobalState({hero: hero})
    return hero;
}
window.nk_stat_add = nk_stat_add

export async function nk_stat_preview(stat) {
    let old_hero = globalState.hero;
    var new_hero = await window.contract.stat_preview({stat: stat});
    console.log(old_hero)
    return new_hero;
}
window.nk_stat_preview = nk_stat_preview

export async function nk_stat_reset() {
    var new_hero = await window.contract.stat_reset({}, BOATLOAD_OF_GAS, ONE_NEAR);
    return new_hero;
}
window.nk_stat_reset = nk_stat_reset

export async function nk_equip_polymorph(index) {
    await window.contract.equip_polymorph({index: index.toString()});
    let hero = {...globalState.hero, polymorph: index}
    setGlobalState({hero: hero})
}
window.nk_equip_polymorph = nk_equip_polymorph

export async function nk_gacha_pull(index) {
    index = Number(index)
    var gachas_gained = await window.contract.gacha_pull({index: index.toString()});
    console.log(gachas_gained)
    alert(`You received gachas! ${gachas_gained}`)
    
    let items = [...globalState.auction.items]
    .map(e=> {
      if (e.index == index) {
        e.count -= 1
      }
      return e
    })
    .filter(e=> e.count > 0)

    let gacha = globalState.auction.gacha
    gachas_gained.each(gacha_index=> {
      let has_gacha = gacha.find(e=> e.index == gacha_index)
      if (!has_gacha) {
        gacha.push({index: gacha_index, count: 1})
      } else {
        has_gacha.count += 1
      }
    })
    setGlobalState({auction: {items: items, gacha: gacha}})

    return gachas_gained;
}
window.nk_gacha_pull = nk_gacha_pull

export async function nk_gachas(accountId) {
  if (!accountId)
    accountId = window.accountId
  var gachas = await window.nk_account.viewState(`accountToPolymorphCount::${accountId}::`, {finality: "final"})
  gachas = gachas.reduce((arr, pair)=> {
    var key = (new TextDecoder()).decode(pair.key).replace(`accountToPolymorphCount::${accountId}::`, "")
    var count = JSON.parse((new TextDecoder()).decode(pair.value))
    arr.push({index: Number(key), count: Number(count)})
    return arr;
  }, [])
  return gachas;
}
window.nk_gachas = nk_gachas

async function autohunter() {
  if (!globalState.autohunt || globalState.location == 0) {
    setTimeout(autohunter, 100)
    return;
  }
  await api_fight()
  setTimeout(autohunter, 100)
}
setTimeout(autohunter, 100)
