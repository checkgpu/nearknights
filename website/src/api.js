import { globalState, setGlobalState } from "./state.js"
import { nk_battle, nk_hero, near_login, nk_shop_buy_gold } from "./near.js"
import { hurt_mob, hurt_char, move_knight } from "./App.js"

export function level_table(exp) {
    switch (true) {
        case exp >= 1059315: return 21
        case exp >= 810742: return 20
        case exp >= 616993: return 19
        case exp >= 466542: return 18
        case exp >= 350209: return 17
        case exp >= 260690: return 16
        case exp >= 192183: return 15
        case exp >= 140089: return 14
        case exp >= 100767: return 13
        case exp >= 71343: return 12
        case exp >= 49554: return 11
        case exp >= 33619: return 10
        case exp >= 22146: return 9
        case exp >= 14047: return 8
        case exp >= 8472: return 7
        case exp >= 4767: return 6
        case exp >= 2421: return 5
        case exp >= 1044: return 4
        case exp >= 333: return 3
        case exp >= 50: return 2
        case exp >= 0: return 1
    }
}

export function level_table_perc(exp) {
    switch (true) {
        case exp >= 1059315: return 100
        case exp >= 810742: return ((exp-810742)/(1059315-810742)) * 100
        case exp >= 616993: return ((exp-616993)/(810742-616993)) * 100
        case exp >= 466542: return ((exp-466542)/(616993-466542)) * 100
        case exp >= 350209: return ((exp-350209)/(466542-350209)) * 100
        case exp >= 260690: return ((exp-260690)/(350209-260690)) * 100
        case exp >= 192183: return ((exp-192183)/(260690-192183)) * 100
        case exp >= 140089: return ((exp-140089)/(192183-140089)) * 100
        case exp >= 100767: return ((exp-100767)/(140089-100767)) * 100
        case exp >= 71343: return ((exp-71343)/(100767-71343)) * 100
        case exp >= 49554: return ((exp-49554)/(71343-49554)) * 100
        case exp >= 33619: return ((exp-33619)/(49554-33619)) * 100
        case exp >= 22146: return ((exp-22146)/(33619-22146)) * 100
        case exp >= 14047: return ((exp-14047)/(22146-14047)) * 100
        case exp >= 8472: return ((exp-8472)/(14047-8472)) * 100
        case exp >= 4767: return ((exp-4767)/(8472-4767)) * 100
        case exp >= 2421: return ((exp-2421)/(4767-2421)) * 100
        case exp >= 1044: return ((exp-1044)/(2421-1044)) * 100
        case exp >= 333: return ((exp-333)/(1044-333)) * 100
        case exp >= 50: return ((exp-50)/(333-50)) * 100
        case exp >= 0: return ((exp-0)/50) * 100
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function api_fight() {
    console.log("fight")
    if (!window.accountId) {
        near_login();
        return;
    }
    var location = globalState.location;
    var count = globalState.count;
    if (window.infight || location == 0)
        return
    window.infight = true;
    setGlobalState({load: {fight: true}})
    var steps = await nk_battle(location, count)
    var ts_m = Date.now()
    steps = steps.map(step=> {return {...step, tick: step.tick + ts_m}})
    await fight_stepper(steps);
    window.infight = false;
    setGlobalState({load: {fight: false}})
}

export async function api_fight_simulator() {
    console.log("fight")
    var location = globalState.location;
    var count = globalState.count;
    if (window.infight)
        return
    window.infight = true;
    var res = await nk_battle(location)
    var ts_m = Date.now()
    var steps = [
        {action: "appear_mob", "id": 3, "hp": 25, tick: 0},
        {action: "slash_mob", dam: 3, tick: 0},
        {action: "slash_char", dam: 6, tick: 500},
        {action: "slash_mob", dam: 3, tick: 1000},
        {action: "slash_mob", tick: 1200},
        {action: "slash_char", dam: 4, tick: 1500},
        {action: "slash_char", tick: 1800},
        {action: "slash_mob", dam: 3, tick: 2000},
        {action: "dead_mob", tick: 2200},
        {action: "gain_gold", amount: "32", tick: 2200},
        {action: "gain_item", id: "23", count: 1, tick: 2200},
        {action: "update_stat", stat: {hp_cur: 144, hp_max: 187, level: 3}, tick: 2200},
    ]

    console.log(steps)
    steps = steps.map(step=> {return {...step, tick: step.tick + ts_m}})
    await fight_stepper(steps);
    window.infight = false;
}

export async function fight_stepper(steps) {
    while (1) {
        var ts_m = Date.now()
        var step = steps[0];
        var time_delta = step.tick - ts_m;
        if (time_delta < 0) {
            time_delta = 0;
        }
        if (time_delta > 0) {
            await sleep(time_delta);
        }

        await fight_step(step);
        steps.shift();
        if (steps.length == 0)
            break;
    }
}

async function fight_step(step) {
    switch (step.action) {
        case "appear_mob":
            setGlobalState({mob: {id: step.id, hp_cur: step.hp, hp_max: step.hp}})
            return;
        case "dead_mob":
            if (window.health_bar)
                window.health_bar.remove()
            window.health_bar = null;
            setGlobalState({mob: null})
            return;
        case "dead_char":
            var hero = await nk_hero()
            if (window.health_bar)
                window.health_bar.remove()
            window.health_bar = null;
            setGlobalState({mob: null, hero: hero})
            return;
        case "update_stat":
            setGlobalState({stat: step.stat})
            return;

        case "slash_mob":
            hurt_mob(step.type, step.dam);
            return;
        case "slash_char":
            hurt_char(step.type, step.dam);
            return

        case "gain_gold":
            setGlobalState({hero: {gold: Number(globalState.hero.gold) + step.amount}})
            return
        case "gain_diamond":
            setGlobalState({remote: {balance: Number(globalState.remote.balance) + step.amount}})
            return
        case "gain_exp":
            setGlobalState({hero: {exp: Number(globalState.hero.exp) + step.amount}})
            return
        case "gain_item":
            setGlobalState({auction: {items: [...globalState.auction.items, {index: Number(step.id), count: Number(step.amount)}]}})
            return

        case "level":
            var hero = await nk_hero()
            setGlobalState({hero: hero})
            return

        case "heal":
            var type = step.type
            if (type == "r") {
                setGlobalState({hero: {red_potion: Number(globalState.hero.red_potion) - 1, hp_cur: Number(globalState.hero.hp_cur) + step.amount}})
            }
            return
    }
}

export async function shop_buy_gold(stacks) {
    if (window.confirm("Buy 1k gold for 1 NEAR?")) {
        let gold = await nk_shop_buy_gold(stacks)
        setGlobalState({hero: {gold: Number(gold)}})
    }
}
window.shop_buy_gold = shop_buy_gold