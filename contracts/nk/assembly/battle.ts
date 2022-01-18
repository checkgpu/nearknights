import { context, PersistentMap, PersistentSet, u128, storage, env, util, logging } from "near-sdk-as"

/*
strength
dexterity
intelligence

damage
armorclass
hit
*/

/*
monsters:
goblin
*/

export function battle(location: u64): Array<string> {
  let owner = context.sender;
  logging.log(`battle ${owner} ${location}`)
  return []
}