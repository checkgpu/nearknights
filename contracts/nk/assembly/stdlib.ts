import { context, PersistentMap, PersistentSet, u128 } from "near-sdk-as"

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
    return new PersistentSet<u64>(`accountToItems2::${owner_id}`);
}
