import { context, PersistentMap, PersistentSet, u128, storage, env, util, logging } from "near-sdk-as"
import { Char, Monster, Item } from "./model_game";
import { add_item, equip_item } from "./stdlib";
import { rng_xorshift128p_seed, rng_next_u64 } from "./rng";
import { calc_char_stats, revive_internal, level_table, revive as revive_i } from "./formulas/char";
import { get_monster } from "./formulas/monsters";
import { get_location_monster } from "./formulas/location";
import { roll_one, roll_multiple, char_damage_mob, mob_damage_char, hit, evade } from "./formulas/calc";
export const heroMap = new PersistentMap<string, Char>("heroMap");

export class State {
  seed: Array<u64> = [];
  log: string = "";

  log_line(line: string): void {
    this.log += line
  }
};

export function create_knight(): Char {
    let hero = new Char(context.sender);
    add_item(context.sender, 100, 1)
    equip_item(context.sender, 100)
    heroMap.set(context.sender, hero);
    return hero;
}

export function create_knight_override(): Char {
    var hero = new Char(context.sender);
    heroMap.set(context.sender, hero);
    return hero;
}

function char_hit_mob(state: State, tick: i32, char: Char, mob: Monster): void {
  let hit_res = hit(state.seed, char.hit, mob.ac)
  if (hit_res == false) {
    state.log_line(`sm m ${tick};`)
    return
  }
  let dam = char_damage_mob(state.seed, char.damage, char.weapon_dice, char.weapon_dice_sides, mob.dr)
  if (dam <= 0) {
    state.log_line(`sm m ${tick};`)
    return
  }
  state.log_line(`sm ${dam} ${tick};`)
  mob.hp_cur -= dam;
  if (mob.hp_cur < 0) {
    mob.hp_cur = 0
  }
}

function mob_hit_char(state: State, tick: i32, char: Char, mob: Monster): void {
  let hit_res = hit(state.seed, mob.level+mob.hit, char.ac)
  if (hit_res == false) {
    state.log_line(`sc m ${tick};`)
    return
  }
  if (mob.ranged == 1 && evade(state.seed, char.er)) {
    state.log_line(`sc e ${tick};`)
    return
  }
  let dam = mob_damage_char(state.seed, mob.level, mob.damage, char.ac, char.dr)
  if (dam <= 0) {
    state.log_line(`sc m ${tick};`)
    return
  }
  state.log_line(`sc ${dam} ${tick};`)
  char.hp_cur -= dam;
  if (char.hp_cur < 0) {
    char.hp_cur = 0
  }
}

function char_potion(state: State, tick: i32, char: Char): void {
  let heal = 26 + roll_one(state.seed, 8)
  let hp_rem = char.hp_max - char.hp_cur
  if (heal > hp_rem) {
    heal = hp_rem
  }
  char.hp_cur += heal
  char.red_potion -= 1
  state.log_line(`h r ${heal} ${tick};`)
}

function resolve_combat(state: State, char: Char, mob: Monster): boolean {
  var tick = 0;
  var won = false;
  var dam = 0;
  while (1) {
    if (tick >= char.next_potion && char.red_potion > 0 && (char.hp_max - char.hp_cur) >= 33) {
      char_potion(state, tick, char)
      char.next_potion = tick+1000
    }

    if (tick >= char.next_attack) {
      char_hit_mob(state, tick, char, mob,)
      char.next_attack += char.attack_speed
    }
    if (mob.hp_cur <= 0) {
      state.log_line(`dm ${tick};`)
      won = true;
      break;
    }

    if (tick >= mob.next_attack) {
      mob_hit_char(state, tick, char, mob)
      mob.next_attack += mob.attack_speed
    }
    if (char.hp_cur <= 0) {
      state.log_line(`dc ${tick};`)
      break;
    }
    //TODO Is there a math,min that is not specced float?
    tick = char.next_attack;
    if (mob.next_attack < tick) {
        tick = mob.next_attack
    }
    //if (char.next_potion < tick && char.red_potion > 0 && (char.hp_max - char.hp_cur) >= 33) {
    //    tick = char.next_potion
    //}
  }
  char.next_fight_block = context.blockIndex + ((tick/1000) - 1)
  return won;
}

function gain_gold(seed: Array<u64>, hero: Char, mob: Monster): i32 {
  var rolls = (mob.level / 11) + 1
  let gold = roll_multiple(seed, rolls, mob.level) * 6
  hero.gold += gold
  return gold;
}

function gain_exp(hero: Char, mob: Monster): i32 {
  let exp = mob.exp*10
  hero.exp += exp;
  return exp;
}

function gain_item(seed: Array<u64>, hero: Char, mob: Monster): u64 {
  for (let x=0; x < mob.drop_table.length; x++) {
    let chance = mob.drop_table[x]
    if (roll_one(seed, 100_000) <= chance.chance) {
      add_item(context.sender, chance.index, 1)
      return chance.index
    }
  }
  return 0;
}

function battle_one(state: State, hero: Char, mob: Monster): boolean {
  hero.next_attack = 0;
  hero.next_potion = 0;
  if (mob.preemptive >= 1) {
    hero.next_attack = 1300;
    mob.next_attack = 0;
  } else {
    mob.next_attack = 300;
  }

  let won = resolve_combat(state, hero, mob)
  if (won) {
    var gold = gain_gold(state.seed, hero, mob)
    state.log_line(`gg ${gold};`)

    var exp = gain_exp(hero, mob)
    state.log_line(`ge ${exp};`)

    var drop_index = gain_item(state.seed, hero, mob)
    if (drop_index != 0) {
      state.log_line(`gi ${drop_index} 1;`)
    }
  }
  return won
}

export function battle(hero_o: Char, location: i32, count: i32): void {
  assert(context.blockIndex >= hero_o.next_fight_block, "You are fighting too fast, slow down")
  assert(hero_o.hp_cur > 0, "Cannot fight while dead")

  var seed = rng_xorshift128p_seed()
  var hero = hero_o.clone()
  calc_char_stats(hero)

  assert(count > 0, "Cannot fight 0 times")
  assert(count <= hero.max_battles, `Cannot fight more than ${hero.max_battles} times`)

  let state = new State();
  state.seed = seed;

  for (let i = 0; i < count; ++i) {
    var start_level = level_table(hero.exp)
    var mob = get_location_monster(state.seed, location)

    //logging.log(`debug_char ${hero.damage} ${hero.hit} ${hero.ac}`)
    //logging.log(`debug_mob ${mob.id} ${mob.hp_max} ${mob.hit}`)

    state.log_line(`am ${mob.id} ${mob.hp_max} ${0};`)

    let won = battle_one(state, hero, mob)

    var end_level = level_table(hero.exp)
    if (end_level > start_level) {
      state.log_line(`lvl ${end_level} ${0};`)

      hero_o.gold = hero.gold
      hero_o.exp = hero.exp
      if (hero.exp > hero_o.exp_max) {
        hero_o.exp_max = hero.exp_max
      }
      hero = hero_o.clone()
      calc_char_stats(hero)
      hero.hp_cur = hero.hp_max
    }

    logging.log(state.log);
    state.log = "";

    if (won) {

    } else {
      revive_internal(hero)
      break;
    }
  }

  hero_o.hp_cur = hero.hp_cur
  hero_o.gold = hero.gold
  hero_o.exp = hero.exp
  if (hero.exp > hero_o.exp_max) {
    hero_o.exp_max = hero.exp_max
  }
  hero_o.red_potion = hero.red_potion
  hero_o.next_fight_block = hero.next_fight_block
  heroMap.set(context.sender, hero_o);
}

export function revive(): void {
  //revive_i()
}