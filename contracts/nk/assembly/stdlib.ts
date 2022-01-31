import { context, PersistentMap, PersistentSet, u128, storage, env, logging } from "near-sdk-as"
import { get_item } from "./formulas/items";
import { get_polymorph } from "./formulas/polymorph";
import { heroMap } from "./battle"

export const ONE_NEAR = u128.from('1000000000000000000000000')
export const TEN_CENT = u128.from('100000000000000000000000')
export const ONE_CENT = u128.from('10000000000000000000000')
export const TWO_CENT = u128.from('20000000000000000000000')
export const BOATLOAD_OF_GAS = 100000000000000;
export const TGAS_50 = 50000000000000;

export function validate_admin(): bool {
  return context.sender == context.contractName;
}

export function owner_items(owner_id: string): PersistentSet<u64> {
  return new PersistentSet<u64>(`accountToItems::${owner_id}`);
}

export function owner_items_count(owner_id: string, index: u64): u64 {
  return storage.getPrimitive<u64>(`accountToItemsCount::${owner_id}::${index}`, 0);
}

function update_owner_items_count(owner_id: string, index: u64, amount: u64): void {
  storage.set<u64>(`accountToItemsCount::${owner_id}::${index}`, amount);
}

export function owner_polymorph_count(owner_id: string, index: u64): u64 {
  return storage.getPrimitive<u64>(`accountToPolymorphCount::${owner_id}::${index}`, 0);
}

function update_owner_polymorph_count(owner_id: string, index: u64, amount: u64): void {
  storage.set<u64>(`accountToPolymorphCount::${owner_id}::${index}`, amount);
}
//function is_equipped_by_index(owner_id: string, index: u64): boolean {
//  return storage.get<boolean>(`equippedByIndex::${owner_id}${index}`, false);
//}

export function equip_item(owner_id: string, index: u64): u64 {
  let item = get_item(index)
  let item_count = owner_items_count(owner_id, index)
  assert(item_count > 0, 'Do not have item');
  assert(item.slot != "", 'Item not equippable');
  let equippedInSlot = equipped_by_slot(owner_id, item.slot)

  let equipped_items = new PersistentSet<u64>(`equippedToItems::${owner_id}`);
  //unequip
  if (equippedInSlot == index) {
    equipped_items.delete(index)
    storage.delete(`equippedBySlot::${owner_id}::${item.slot}`)
    return equippedInSlot
  }
  if (equippedInSlot == 0) {
    equipped_items.add(index)
    storage.set<u64>(`equippedBySlot::${owner_id}::${item.slot}`, index)
    return 0
  } else {
    equipped_items.delete(equippedInSlot)
    equipped_items.add(index)
    storage.set<u64>(`equippedBySlot::${owner_id}::${item.slot}`, index)
    return equippedInSlot
  }
}

export function deequip_item(owner_id: string, index: u64): void {
  let item = get_item(index)
  let equippedInSlot = equipped_by_slot(owner_id, item.slot)
  if (equippedInSlot == 0) {
    return
  }
  assert(equippedInSlot == index, 'This item is not equipped');
  equipped_items(owner_id).delete(index)
  storage.set<u64>(`equippedBySlot::${owner_id}::${item.slot}`, 0)
}

export function add_polymorph(owner_id: string, index: u64, amount: u64): u64 {
  let poly_count = owner_polymorph_count(owner_id, index)
  let poly = get_polymorph(index)
  let new_count = poly_count + amount
  update_owner_polymorph_count(owner_id, index, new_count)
  return new_count
}

export function equip_polymorph(owner_id: string, index: u64): void {
  let poly_count = owner_polymorph_count(owner_id, index)
  assert(poly_count > 0, 'Do not have poly');
  let poly = get_polymorph(index)

  var hero = heroMap.getSome(owner_id)
  hero.polymorph = index
  heroMap.set(owner_id, hero);
}

export function equipped_items(owner_id: string): PersistentSet<u64> {
  return new PersistentSet<u64>(`equippedToItems::${owner_id}`);
}

export function equipped_by_slot(owner_id: string, slot: string): u64 {
  return storage.getPrimitive<u64>(`equippedBySlot::${owner_id}::${slot}`, 0);
}

export function add_item(receiver_id: string, index: u64, amount: u64): u64 {
  //TODO why does this only compile like this
  let owner_items = new PersistentSet<u64>(`accountToItems::${receiver_id}`);
  if (!owner_items.has(index)) {
    owner_items.add(index)
  }
  let item_count = owner_items_count(receiver_id, index)
  let new_amount = item_count + amount
  update_owner_items_count(receiver_id, index, new_amount)
  return new_amount;
}

export function remove_item(receiver_id: string, index: u64, amount: u64): u64 {
  let item_count = owner_items_count(receiver_id, index)
  let new_amount = item_count - amount
  let slot = get_item(index).slot
  assert(new_amount >= 0, 'Cannot remove_item less than we have');
  if (new_amount == 0) {
    assert(equipped_by_slot(receiver_id, slot) != index, 'Cannot remove_item because we have it equipped');
    owner_items(receiver_id).delete(index)
  }
  update_owner_items_count(receiver_id, index, new_amount)
  return new_amount;
}

export function time_second(): u64 {
  return env.block_timestamp() / 1_000_000_000
}

export function time_milli(): u64 {
  return env.block_timestamp() / 1_000_000
}