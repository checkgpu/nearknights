import { globalState, setGlobalState, setGlobalStateFull, initialState, getInitialState, setInitialState, mergeObjects, doNav} from "./state.js"

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
const TESTNET = false;
if (TESTNET) {
  NEAR_URL = "https://rpc.testnet.near.org"
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

  //const lkr_near = await nearlib.connect(nearConfig);
  window.lkr_account = await window.near.account(CONTRACT_NAME)

  const walletConnection = new nearlib.WalletConnection(window.near);
  window.walletConnection = walletConnection;

  const accountId = walletConnection.getAccountId();
  window.accountId = accountId;

  // Initializing our contract APIs by contract name and configuration.
  window.contract = await new nearlib.Contract(walletConnection.account(), nearConfig.contractName, {
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ["nft_for_sale", "nft_for_sale_all"],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ["nft_market_sell", "nft_market_buy", "nft_market_cancel", "nk_fight"],
    sender: walletConnection.getAccountId(),
  });

  if (accountId) {
    window.account = walletConnection.account();
    var balance = (await window.account.getAccountBalance()).available;
    var {itemsMarket, itemsAvailable, itemsActive} = await near_refresh_ah_1(accountId)
    setInitialState({
        accountId: accountId,
        balance: balance,
        auction: {
          query: itemsMarket,
          items: itemsAvailable,
          active: itemsActive
        }
    });
  } else {
    var itemsMarket = await near_refresh_item_market_guest();
    setInitialState({
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
  var {itemsMarket, itemsAvailable, itemsActive} = await near_refresh_ah_1(accountId)
  setGlobalState({
      auction: {
        query: itemsMarket,
        items: itemsAvailable,
        active: itemsActive,
      }
  });
}

export async function near_refresh_item_market_guest() {
  var market = await window.lkr_account.viewState("itemMarket_2::", {finality: "final"})

  var itemsMarket = market.map((pair)=> {
    var json = (new TextDecoder()).decode(pair.value)
    return JSON.parse(json);
  })
  return itemsMarket;
}

export async function near_refresh_ah_1(accountId) {
  var market = await window.lkr_account.viewState("itemMarket_2::", {finality: "final"})

  var itemsMarket = market.map((pair)=> {
    var json = (new TextDecoder()).decode(pair.value)
    return JSON.parse(json);
  })
  var itemsActive = itemsMarket.filter(i=> i.owner_id == accountId)
  itemsMarket = itemsMarket.filter(i=> i.owner_id != accountId)

  var index_mapping = await window.lkr_account.viewState(`itemToMetadata_2::`, {finality: "final"})
  index_mapping = index_mapping.reduce((map, pair)=> {
    var key = (new TextDecoder()).decode(pair.key).replace("itemToMetadata_2::", "")
    var index = JSON.parse((new TextDecoder()).decode(pair.value))
    map[key] = index;
    return map;
  }, {})

  var available = await window.lkr_account.viewState(`_vectoraccountToItems2::${accountId}::`, {finality: "final"})
  console.log(accountId, available, index_mapping)
  var itemsAvailable = available.map((pair)=> {
    var key = (new TextDecoder()).decode(pair.key)
    if (key == `_vectoraccountToItems2::${accountId}::len`) {
      return null;
    }
    var token_id = JSON.parse((new TextDecoder()).decode(pair.value))
    return {token_id: token_id, index: index_mapping[token_id]};
  })
  itemsAvailable = itemsAvailable.filter(i=> i)

  console.log({itemsActive, itemsMarket, itemsAvailable})
  return {itemsActive, itemsMarket, itemsAvailable}
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

export async function nk_fight(location) {
    var res = await window.contract.nk_fight({location: location}, BOATLOAD_OF_GAS);
}

