import { context } from "near-sdk-as"
import { Char } from "../model_game"
import { get_item } from "./items"
import { equipped_items } from "../stdlib"
import { heroMap } from "../battle"

export function level_table(exp: u64): i32 {
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
    return 1;
}

function wis_mr_table(wis: i32): i32 {
    switch (true) {
        case wis >= 27: return 61
        case wis >= 26: return 55
        case wis >= 25: return 54
        case wis >= 24: return 50
        case wis >= 23: return 47
        case wis >= 22: return 36
        case wis >= 21: return 28
        case wis >= 20: return 21
        case wis >= 19: return 15
        case wis >= 18: return 10
        case wis >= 17: return 6
        case wis >= 16: return 3
        case wis >= 15: return 3
        case wis >= 0: return 0
    }
    return 0;
}

function max_battles(max_level: i32): i32 {
    switch (true) {
        case max_level >= 60: return 20
        case max_level >= 50: return 11
        case max_level >= 40: return 7
        case max_level >= 30: return 5
        case max_level >= 20: return 4
        case max_level >= 10: return 3
        case max_level >= 6: return 2
        case max_level >= 0: return 1
    }
    return 0;
}

const equipSlots = [
    "weapon",
    "shield",
    "head",
    "body",
    "legs",
    "gloves",
    "boots",
    "shirt",
    "cloak",
    "neck",
    "ring",
    "belt",
]

function apply_gear_bonuses(hero: Char): void {
    let equipped = equipped_items(hero.account).values()
    for (let i = 0; i < equipped.length; ++i) {
        let index = equipped[i]
        if (index != 0) {
            let item = get_item(index)
            hero.str += item.str
            hero.dex += item.dex
            hero.int += item.int
            hero.con += item.con
            hero.wis += item.wis
            hero.damage += item.damage
            hero.hit += item.hit
            hero.crit += item.crit
            hero.ac += item.ac
            hero.dr += item.dr
            hero.er += item.er
            hero.carry += item.carry
            hero.weapon_dice += item.weapon_dice
            hero.weapon_dice_sides += item.weapon_dice_sides
            hero.attack_speed -= item.attack_speed
        }
    }
}

export function calc_char_stats(clone: Char): void {
    apply_gear_bonuses(clone)

    clone.level = level_table(clone.exp)
    clone.level_max = level_table(clone.exp_max)
    clone.bonus_total = (clone.level_max / 3)
    if (clone.level_max - 49 > 0) {
        clone.bonus_total += (clone.level_max - 49)
    }
    clone.hp_max = (clone.con-10)*20+clone.level*15
    let extra_str_dam = 0;
    if (clone.str >= 13)
        extra_str_dam += 1
    if (clone.str >= 18)
        extra_str_dam += 1
    if (clone.str >= 23)
        extra_str_dam += 1
    if (clone.str >= 24)
        extra_str_dam += 1
    if (clone.str >= 25)
        extra_str_dam += 1
    clone.damage += 1+clone.level_max/10+(clone.str-12)/2+extra_str_dam
    clone.hit += clone.level + clone.dex + clone.level/5
    let dex_ac_bonus = 8
    if (clone.dex >= 13)
        dex_ac_bonus = 7
    if (clone.dex >= 16)
        dex_ac_bonus = 6
    if (clone.dex >= 18)
        dex_ac_bonus = 5
    if (clone.dex >= 21)
        dex_ac_bonus = 4
    if (clone.dex >= 25)
        dex_ac_bonus = 3
    clone.ac += clone.level/dex_ac_bonus + (clone.dex-12)/6
    clone.er += clone.level/4+(clone.dex-12)/2
    clone.mr += (clone.level/2) + wis_mr_table(clone.wis)
    clone.carry += 100 + ((clone.level_max/5)*100) + (clone.con-12)*100
    clone.hp_regen += (clone.con-12)*1
    clone.max_battles = max_battles(clone.level_max)
}

export function revive_internal(hero: Char): void {
    hero.hp_cur = (hero.con-10)*20+15
    if (hero.exp > hero.exp_max)
        hero.exp_max = hero.exp
    hero.exp = 0
    let reds = buy_potions(hero.gold, hero.carry)
    hero.red_potion = reds
    hero.gold -= reds*38
}

export function revive(): void {
    var hero_o = heroMap.getSome(context.sender)
    assert(context.blockIndex >= hero_o.next_fight_block, "You are reviving too fast, slow down")
    var hero = hero_o.clone()
    calc_char_stats(hero)

    hero_o.hp_cur = hero.hp_max
    if (hero.exp > hero_o.exp_max)
        hero_o.exp_max = hero.exp
    hero_o.red_potion = hero.carry / 8
    hero_o.exp = 0
    heroMap.set(context.sender, hero_o);
}

export function buy_potions(gold: u64, carry: i32): i32 {
    let max = <u64>(carry / 8)
    let max_by_gold = gold / 38
    if (max_by_gold < max) {
        return <i32>(max_by_gold)
    }
    return <i32>(max)
}

export function stat_add(index: i32): Char {
  var hero = heroMap.getSome(context.sender)
  assert(hero.bonus_total - hero.bonus_spent > 0, "no bonus points to spend")
  switch (index) {
    case 0: hero.str += 1; break;
    case 1: hero.dex += 1; break;
    case 2: hero.int += 1; break;
    case 3: hero.wis += 1; break;
    case 4: hero.con += 1; break;
  }
  hero.bonus_spent += 1
  heroMap.set(context.sender, hero);
  calc_char_stats(hero)
  return hero;
}

export function stat_preview(index: i32): Char {
  var hero = heroMap.getSome(context.sender)
  switch (index) {
    case 0: hero.str += 1; break;
    case 1: hero.dex += 1; break;
    case 2: hero.int += 1; break;
    case 3: hero.wis += 1; break;
    case 4: hero.con += 1; break;
  }
  calc_char_stats(hero)
  return hero;
}