import { rng_next_u64 } from "../rng";

export function roll_one(seed: Array<u64>, dice_sides: i32): i32 {
  return <i32>(rng_next_u64(seed, dice_sides) + 1);
}

export function roll_multiple(seed: Array<u64>, dice_count: i32, dice_sides: i32): i32{
  var sum = 0;
  for (var x=0; x<dice_count; x++) {
    sum += roll_one(seed, dice_sides);
  }
  return sum;
}

export function char_damage_mob(seed: Array<u64>, extra_damage: i32, weapon_dice: i32, weapon_dice_sides: i32, dr: i32): i32 {
    let damage = roll_multiple(seed, weapon_dice, weapon_dice_sides) + extra_damage
    return damage-dr
}

export function mob_damage_char(seed: Array<u64>, level: i32, extra_damage: i32, ac: i32, dr: i32): i32 {
    let damage = 1 + roll_multiple(seed, 2, level/2) + extra_damage
    let absorb = reduction_from_ac(seed, ac)
    return (damage-absorb)-dr
}

export function hit_new(seed: Array<u64>, hit: i32, ac: i32): boolean {
    let roll = roll_one(seed, 66)
    let attackerDice = roll+1+hit-33
    let defenderDice = 10 + ac
    let fumble = hit - 9
    let crit = hit + 10
    if (roll <= 1) {
        return false
    }
    if (roll > 63) {
        return true
    }
    if (attackerDice > defenderDice) {
        return true
    }
    return false
}

export function hit(seed: Array<u64>, hit: i32, ac: i32): boolean {
    let attackerDice = roll_one(seed, 20)+1+hit-10
    let defenderDice = 10 + ac
    let fumble = hit - 9
    let crit = hit + 10
    if (attackerDice <= fumble) {
        return false
    }
    if (attackerDice >= crit) {
        return true
    }
    if (attackerDice > defenderDice) {
        return true
    }
    return false
}

export function evade(seed: Array<u64>, er: i32): boolean {
    return er >= roll_one(seed, 100);
}

export function reduction_from_ac(seed: Array<u64>, ac: i32): i32 {
    if (ac >= 2) {
        return roll_one(seed, ac/2);
    } else {
        return 0
    }
}
