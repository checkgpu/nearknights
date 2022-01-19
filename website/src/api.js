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
    steps = [
  { action: 'appear_mob', id: 1, hp: 56, tick: 0 },
  { action: 'slash_mob', dam: 2, tick: 0 },
  { action: 'slash_char', dam: 2, tick: 500 },
  { action: 'slash_mob', dam: 1, tick: 1000 },
  { action: 'slash_char', dam: 5, tick: 1500 },
  { action: 'slash_mob', dam: 1, tick: 2000 },
  { action: 'slash_char', dam: 3, tick: 2500 },
  { action: 'slash_mob', dam: 0, tick: 3000 },
  { action: 'slash_char', dam: 4, tick: 3500 },
  { action: 'slash_mob', dam: 1, tick: 4000 },
  { action: 'slash_char', dam: 3, tick: 4500 },
  { action: 'slash_mob', dam: 2, tick: 5000 },
  { action: 'slash_char', dam: 3, tick: 5500 },
  { action: 'slash_mob', dam: 1, tick: 6000 },
  { action: 'slash_char', dam: 0, tick: 6500 },
  { action: 'slash_mob', dam: 1, tick: 7000 },
  { action: 'slash_char', dam: 2, tick: 7500 },
  { action: 'slash_mob', dam: 3, tick: 8000 },
  { action: 'slash_char', dam: 3, tick: 8500 },
  { action: 'slash_mob', dam: 2, tick: 9000 },
  { action: 'slash_char', dam: 2, tick: 9500 },
  { action: 'slash_mob', dam: 0, tick: 10000 },
  { action: 'slash_char', dam: 1, tick: 10500 },
  { action: 'slash_mob', dam: 2, tick: 11000 },
  { action: 'slash_char', dam: 1, tick: 11500 },
  { action: 'slash_mob', dam: 1, tick: 12000 },
  { action: 'slash_char', dam: 4, tick: 12500 },
  { action: 'slash_mob', dam: 2, tick: 13000 },
  { action: 'slash_char', dam: 3, tick: 13500 },
  { action: 'slash_mob', dam: 0, tick: 14000 },
  { action: 'slash_char', dam: 5, tick: 14500 },
  { action: 'slash_mob', dam: 2, tick: 15000 },
  { action: 'slash_char', dam: 1, tick: 15500 },
  { action: 'slash_mob', dam: 1, tick: 16000 },
  { action: 'slash_char', dam: 5, tick: 16500 },
  { action: 'slash_mob', dam: 1, tick: 17000 },
  { action: 'slash_char', dam: 3, tick: 17500 },
  { action: 'slash_mob', dam: 2, tick: 18000 },
  { action: 'slash_char', dam: 3, tick: 18500 },
  { action: 'slash_mob', dam: 3, tick: 19000 },
  { action: 'slash_char', dam: 3, tick: 19500 },
  { action: 'slash_mob', dam: 3, tick: 20000 },
  { action: 'slash_char', dam: 1, tick: 20500 },
  { action: 'slash_mob', dam: 3, tick: 21000 },
  { action: 'slash_char', dam: 3, tick: 21500 },
  { action: 'slash_mob', dam: 0, tick: 22000 },
  { action: 'slash_char', dam: 3, tick: 22500 },
  { action: 'slash_mob', dam: 2, tick: 23000 },
  { action: 'slash_char', dam: 4, tick: 23500 },
  { action: 'slash_mob', dam: 0, tick: 24000 },
  { action: 'slash_char', dam: 1, tick: 24500 },
  { action: 'slash_mob', dam: 3, tick: 25000 },
  { action: 'slash_char', dam: 1, tick: 25500 },
  { action: 'slash_mob', dam: 1, tick: 26000 },
  { action: 'slash_char', dam: 0, tick: 26500 },
  { action: 'slash_mob', dam: 2, tick: 27000 },
  { action: 'slash_char', dam: 1, tick: 27500 },
  { action: 'slash_mob', dam: 2, tick: 28000 },
  { action: 'slash_char', dam: 3, tick: 28500 },
  { action: 'slash_mob', dam: 2, tick: 29000 },
  { action: 'slash_char', dam: 4, tick: 29500 },
  { action: 'slash_mob', dam: 2, tick: 30000 },
  { action: 'slash_char', dam: 1, tick: 30500 },
  { action: 'slash_mob', dam: 2, tick: 31000 },
  { action: 'slash_char', dam: 4, tick: 31500 },
  { action: 'slash_mob', dam: 3, tick: 32000 },
  { action: 'slash_char', dam: 4, tick: 32500 },
  { action: 'slash_mob', dam: 3, tick: 33000 },
  { action: 'dead_mob', tick: 33000 },
  { action: 'gain_gold', amount: 2, tick: 0 },
  { action: 'gain_exp', amount: 80, tick: 0 },
  { action: 'update_stat', stat: { hp_cur: 34 }, tick: 0 }
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
