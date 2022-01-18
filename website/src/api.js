import { globalState, setGlobalState } from "./state.js"
import { nk_fight } from "./near.js"
import { hurt_mob, hurt_char } from "./App.js"

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function api_fight() {
    console.log("fight")
    var location = globalState.location;
    if (window.infight)
        return
    window.infight = true;
    //var res = await nk_fight(location)
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

async function fight_stepper(steps) {
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
            window.health_bar.remove()
            window.health_bar = null;
            setGlobalState({mob: null})
            return;
        case "update_stat":
            setGlobalState({stat: step.stat})
            return;

        case "slash_mob":
            hurt_mob(step.dam);
            return;
        case "slash_char":
            hurt_char(step.dam);
            return
    }
}
