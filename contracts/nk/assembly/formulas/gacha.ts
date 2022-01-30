import { remove_item, add_polymorph } from "../stdlib"
import { roll_one } from "./calc"
import { rng_xorshift128p_seed } from "../rng";

export function gacha_pull(accountId: string, index: u64): Array<u64> {
    var seed = rng_xorshift128p_seed()
    remove_item(accountId, index, 1)
    if (index == 6_000_000) {
        return hero_gacha(seed, accountId)
    } else if (index == 6_000_100) {
        return hero_gacha_premium(seed, accountId)
    } else if (index == 6_000_200) {
        return hero_gacha_epic_x11(seed, accountId)
    }
    return [0];
}

export function hero_gacha(seed: Array<u64>, accountId: string): Array<u64> {
    let pull: u64;
    if (roll_one(seed, 100_000) <= 509) {
        pull = 199 + <u64>roll_one(seed, 22)
    } else if (roll_one(seed, 100_000) <= 20_211) {
        pull = 99 + <u64>roll_one(seed, 21)
    } else {
        pull = <u64>roll_one(seed, 21)
    }
    add_polymorph(accountId, pull, 1)
    return [pull]
}

export function hero_gacha_premium(seed: Array<u64>,accountId: string): Array<u64> {
    let pull: u64;
    if (roll_one(seed, 100_000) <= 88) {
        pull = 299 + <u64>roll_one(seed, 8)
    } else if (roll_one(seed, 100_000) <= 509) {
        pull = 199 + <u64>roll_one(seed, 22)
    } else if (roll_one(seed, 100_000) <= 20_211) {
        pull = 99 + <u64>roll_one(seed, 21)
    } else {
        pull = <u64>roll_one(seed, 21)
    }
    add_polymorph(accountId, pull, 1)
    return [pull]
}

export function hero_gacha_epic_x11(seed: Array<u64>,accountId: string): Array<u64> {
    let pulls: Array<u64>;
    for (let x = 0; x < 11; x++) {
        pulls.push(hero_gacha_epic_x11_1(seed, accountId))
    }
    return pulls
}

export function hero_gacha_epic_x11_1(seed: Array<u64>, accountId: string): u64 {
    let pull: u64;
    if (roll_one(seed, 100_000) <= 88) {
        pull = 399 + <u64>roll_one(seed, 3)
    } else if (roll_one(seed, 100_000) <= 882) {
        pull = 299 + <u64>roll_one(seed, 8)
    } else if (roll_one(seed, 100_000) <= 5_090) {
        pull = 199 + <u64>roll_one(seed, 22)
    } else if (roll_one(seed, 100_000) <= 60_211) {
        pull = 99 + <u64>roll_one(seed, 21)
    } else {
        pull = <u64>roll_one(seed, 21)
    }
    add_polymorph(accountId, pull, 1)
    return pull
}