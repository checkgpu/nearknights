import { context, PersistentMap, PersistentSet, u128, storage } from "near-sdk-as"
import { get_item_slot } from "./model_game";

export const ONE_NEAR = u128.from('1000000000000000000000000')
export const TEN_CENT = u128.from('100000000000000000000000')
export const ONE_CENT = u128.from('10000000000000000000000')
export const TWO_CENT = u128.from('20000000000000000000000')
export const BOATLOAD_OF_GAS = 100000000000000;
export const TGAS_50 = 50000000000000;

export const itemToMetadata = new PersistentMap<u64, u64>("itemToMetadata");

export function validate_admin(): bool {
  return context.sender == context.contractName;
}

export function owner_items(owner_id: string): PersistentSet<u64> {
  return new PersistentSet<u64>(`accountToItems::${owner_id}`);
}

export function owner_items_count(owner_id: string, index: u64): u64 {
  return storage.getPrimitive<u64>(`accountToItemsCount::${owner_id}${index}`, 0);
}

function update_owner_items_count(owner_id: string, index: u64, amount: u64): void {
  storage.set<u64>(`accountToItemsCount::${owner_id}${index}`, amount);
}

//function is_equipped_by_index(owner_id: string, index: u64): boolean {
//  return storage.get<boolean>(`equippedByIndex::${owner_id}${index}`, false);
//}

function equipped_by_slot(owner_id: string, slot: string): u64 {
  return storage.getPrimitive<u64>(`equippedBySlot::${owner_id}${slot}`, 0);
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
  let slot = get_item_slot(index)
  assert(new_amount < 0, 'Cannot remove_item less than we have');
  if (new_amount == 0) {
    assert(equipped_by_slot(receiver_id, slot) != index, 'Cannot remove_item because we have it equipped');
    owner_items(receiver_id).delete(index)
  }
  update_owner_items_count(receiver_id, index, new_amount)
  return new_amount;
}