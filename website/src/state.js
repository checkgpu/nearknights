export var initialState = {
    path: window.location.pathname,
    auction: {
      tab: "buy",
      query: [
        //{token_id: "3", index: 1010000, owner_id: "lkr.testnet", price: "1000000000000000000000000", count: 1},
        //{token_id: "4", index: 1010000, owner_id: "lkr.testnet", price: "6000000000000000000000000", count: 1},
        //{token_id: "5", index: 1010000, owner_id: "lkr.testnet", price: "1000000000000000000000000", count: 1},
      ],
      items: [
        //{token_id: "6", index: 1010000, count: 1},
        //{token_id: "7", index: 1010000, count: 1},
      ],
      active: [
        //{token_id: "8", index: 1010000, count: 1, price: "6000000000000000000000000"},
        //{token_id: "9", index: 1010000, count: 1, price: "6000000000000000000000000"},
        //{token_id: "10", index: 1010000, count: 1, price: "6000000000000000000000000"},
      ]
    },
    remote: {
      balance: "0",
      orders: [],
    },
    hero: {
    },
    x: 1230,
    y: 710,
    location: 0,
    count: 1,
    autohunt: false,
    mob: null
};

function isMergeableObject(value) {
    return isNonNullObject(value)
        && !isSpecial(value)
}

function isNonNullObject(value) {
    return !!value && typeof value === 'object'
}

function isSpecial(value) {
    var stringValue = Object.prototype.toString.call(value)

    return stringValue === '[object RegExp]'
        || stringValue === '[object Date]'
        || stringValue === '[object Uint8Array]'
        || isReactElement(value)
}

var canUseSymbol = typeof Symbol === 'function' && Symbol.for
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7

function isReactElement(value) {
    return value.$$typeof === REACT_ELEMENT_TYPE
}

export let globalState = {};
export let setGlobalState0 = () => {};
export let setGlobalState = (new_state) => {
    var state = window.deepmerge(globalState, new_state, {
        arrayMerge: (dest, source, opts) => source,
        isMergeableObject: (obj)=> isMergeableObject(obj)
    })
    setGlobalState0(state);
};
export let setGlobalStateFull = (new_state) => {
    setGlobalState0(new_state);
};

export let mergeObjects = (old_state, new_state) => {
    var state = window.deepmerge(old_state, new_state, {
        arrayMerge: (dest, source, opts) => source,
        isMergeableObject: (obj)=> isMergeableObject(obj)
    })
    return state;
};

export function wireUpGlobalState(hook_globalState, hook_setGlobalState0) {
    globalState = hook_globalState;
    setGlobalState0 = hook_setGlobalState0;
}

export function buildInitialState() {
    return {
        ...initialState,
    };
    //return initialState;
};

export function getInitialState() {
    return initialState;
};

export function setInitialState(state) {
    initialState = mergeObjects(initialState, state)
    return initialState;
};

function route(path) {
    //if (globalState.session == null) {
    //    return "/login"
    //}
    return path;
}

export const doNav = async (e, next_page) => {
    e.preventDefault();
    next_page = route(next_page);
    if (globalState.path !== next_page) {
        window.history.pushState(undefined, undefined, next_page);
        setGlobalState({path: next_page});
    }
    return false;
}

window.onpopstate = function(e) {
    var next_page = route(window.location.pathname);
    setGlobalState({path: next_page});
}