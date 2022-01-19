import { context, PersistentMap, PersistentSet, u128, storage, env, util, logging } from "near-sdk-as"
import { Char, Item } from "./model_game";
const heroMap = new PersistentMap<string, Char>("heroMap");

export function create_knight(): Char {
    var hero = heroMap.get(context.sender)
    if (hero == null) {
        hero = new Char();
        heroMap.set(context.sender, hero);
        return hero;
    } else {
       return hero; 
    }
}

export function equip(id: u64): Char {

}

export function battle(location: i32): Array<string> {
  const hero = heroMap.getSome(context.sender)
  return []
}