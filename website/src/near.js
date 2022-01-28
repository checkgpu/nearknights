/* global BigInt */
import { globalState, setGlobalState, setGlobalStateFull, initialState, getInitialState, setInitialState, mergeObjects, doNav} from "./state.js"
import { api_fight } from "./api.js"

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
    changeMethods: ["nft_market_sell", "nft_market_buy", "nft_market_cancel", "create_knight", "battle", "revive", "buy_gold"],
    sender: walletConnection.getAccountId(),
  });

  if (accountId) {
    window.account = walletConnection.account();
    var balance = (await window.account.getAccountBalance()).available;
    var {itemsMarket, itemsAvailable, itemsActive, itemsEquipped, itemsEquippedByIndex} = await near_refresh_ah_1(accountId)
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
          equippedByIndex: itemsEquippedByIndex
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
  var {itemsMarket, itemsAvailable, itemsActive, itemsEquipped, itemsEquippedByIndex} = await near_refresh_ah_1(accountId)
  setGlobalState({
      auction: {
        query: itemsMarket,
        items: itemsAvailable,
        active: itemsActive,
        equipped: itemsEquipped,
        equippedByIndex: itemsEquippedByIndex
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
  var equipped = window.nk_account.viewState(`equippedBySlot::${accountId}`, {finality: "final"})
  var count_mapping = window.nk_account.viewState(`accountToItemsCount::${accountId}`, {finality: "final"})
  var available = window.nk_account.viewState(`_vectoraccountToItems::${accountId}::`, {finality: "final"})

  equipped = await equipped
  var itemsEquipped = equipped.reduce((map, pair)=> {
    var slot = (new TextDecoder()).decode(pair.key).replace(`equippedBySlot::${accountId}`, "")
    var token_id = JSON.parse((new TextDecoder()).decode(pair.value))
    map[slot] = Number(token_id);
    return map;
  }, {})

  count_mapping = await count_mapping
  count_mapping = count_mapping.reduce((map, pair)=> {
    var key = (new TextDecoder()).decode(pair.key).replace(`accountToItemsCount::${accountId}`, "")
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
    return {token_id: token_id, count: count_mapping[token_id]};
  })
  itemsAvailable = itemsAvailable.filter(i=> i)

  market = await market
  var itemsMarket = market.map((pair)=> {
    var json = (new TextDecoder()).decode(pair.value)
    return JSON.parse(json);
  })
  var itemsActive = itemsMarket.filter(i=> i.owner_id == accountId)
  itemsMarket = itemsMarket.filter(i=> i.owner_id != accountId)

  let itemsEquippedByIndex = {}
  for (const [key, value] of Object.entries(itemsEquipped)) {
    itemsEquippedByIndex[value] = key
  }

  console.log({itemsActive, itemsMarket, itemsAvailable, itemsEquipped, itemsEquippedByIndex})
  return {itemsActive, itemsMarket, itemsAvailable, itemsEquipped, itemsEquippedByIndex}
}

export async function nft_market_sell(token_id, price) {
    var token_id = token_id.toString()
    var res = await window.contract.nft_market_sell({token_id: token_id, price: price});
    var item = globalState.auction.items.find(i=> i.token_id == token_id)
    var itemsAvailable = globalState.auction.items.filter(i=> i.token_id != token_id)
    var active_item = {token_id: token_id, index: item.index, price: price, count: 1}
    
    var itemsActive = globalState.auction.active.slice()
    itemsActive.push(active_item)
    
    console.log(itemsAvailable, itemsActive)
    setGlobalState({
        auction: {
          items: itemsAvailable,
          active: itemsActive,
        }
    });
}

export async function nft_market_cancel(token_id) {
    var token_id = token_id.toString()
    var res = await window.contract.nft_market_cancel({token_id: token_id});
    var item = globalState.auction.active.find(i=> i.token_id == token_id)
    var itemsActive = globalState.auction.active.filter(i=> i.token_id != token_id)
    var available_item = {token_id: token_id, index: item.index}
    
    var itemsAvailable = globalState.auction.items.slice()
    itemsAvailable.push(available_item)
    
    console.log(itemsAvailable, itemsActive)
    setGlobalState({
        auction: {
          items: itemsAvailable,
          active: itemsActive,
        }
    });
}

export async function nft_market_buy(token_id, near_price) {
    var token_id = token_id.toString()
    var res = await window.contract.nft_market_buy({token_id: token_id}, BOATLOAD_OF_GAS, near_price);
    
    var item = globalState.auction.query.find(i=> i.token_id == token_id)
    var itemsMarket = globalState.auction.query.filter(i=> i.token_id != token_id)
    var available_item = {token_id: token_id, index: item.index}
    
    var itemsAvailable = globalState.auction.items.slice()
    itemsAvailable.push(available_item)
    
    console.log(itemsAvailable)
    setGlobalState({
        auction: {
          query: itemsMarket,
          items: itemsAvailable,
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
    console.log(res)
}

export async function nk_hero() {
    var res = await window.contract.hero({accountId: window.accountId});
    return res;
}
window.nk_hero = nk_hero

export async function nk_buy_gold(count) {
    let near = (BigInt(ONE_NEAR) * BigInt(count)).toString()
    var res = await window.contract.buy_gold({accountId: window.accountId, stack_count: count}, BOATLOAD_OF_GAS, near);
    return res;
}
window.nk_buy_gold = nk_buy_gold

async function autohunter() {
  if (!globalState.autohunt || globalState.location == 0) {
    setTimeout(autohunter, 100)
    return;
  }
  await api_fight()
  setTimeout(autohunter, 100)
}
setTimeout(autohunter, 100)
