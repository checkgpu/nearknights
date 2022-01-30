import { roll_one } from "./calc";
import { get_monster } from "./monsters"
import { Location, IndexChance, Monster } from "../model_game"

var location_1 = new Location(1, 1);
location_1.monsters = [
    new IndexChance(5, 600),
    new IndexChance(4, 1_200),
    new IndexChance(3, 25_000),
    new IndexChance(2, 25_000),
    new IndexChance(1, 100_000),
];

var location_2 = new Location(2, 1);
location_2.monsters = [
    new IndexChance(13, 1_200),
    new IndexChance(12, 25_000),
    new IndexChance(11, 25_000),
    new IndexChance(10, 100_000),
];

var location_3 = new Location(3, 1);
location_3.monsters = [
    new IndexChance(5, 10_000),
    new IndexChance(4, 25_000),
    new IndexChance(3, 25_000),
    new IndexChance(2, 100_000),
];

var location_4 = new Location(4, 1);
location_4.monsters = [
    new IndexChance(21, 10_000),
    new IndexChance(20, 25_000),
    new IndexChance(22, 100_000),
];

const locations = new Map<u64, Location>()
locations.set(1, location_1)
locations.set(2, location_2)
locations.set(3, location_3)
locations.set(4, location_4)

export function get_location(index: u64): Location {
    let location = locations.get(index);
    if (location != null) {
        return location;
    } else {
        assert(false, "Undefined location")
        return new Location(1);
    }
}

export function get_location_monster(seed: Array<u64>, index: u64): Monster {
    let location = locations.get(index);
    assert(location != null, "Undefined location")

    for (let x=0; x < location.monsters.length; x++) {
        let chance = location.monsters[x]
        if (roll_one(seed, 100_000) <= chance.chance) {
            return get_monster(chance.index)
        }
    }
    assert(false, "Get to end of get_location_monster this should never happen")
    return get_monster(1);
}