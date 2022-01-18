import { context, PersistentMap, PersistentSet, u128, ContractPromise, storage, env, util, logging } from "near-sdk-as"

//Big thanks to https://github.com/agar3s/spacewars13k-server for their AS NFT implmentation
import { Token, NFTMetadata, TokenMetadata } from "./model";
import { validate_admin, owner_items, itemToMetadata } from "./stdlib";

export const TokenMetadataByIndex = new PersistentMap<u64, TokenMetadata>("token_meta");

// BEGIN NFT (NEP-171)
export function init(owner_id: string, metadata: NFTMetadata): void {
  assert(validate_admin(), 'You are not authorized to run this function');
  const Metadata: NFTMetadata = new NFTMetadata(
    metadata.spec, metadata.name, metadata.symbol, metadata.icon, 
    metadata.base_uri, metadata.reference, metadata.reference_hash);
  storage.set("global_meta", Metadata);
}

export function nft_metadata(): NFTMetadata {
  return storage.getSome<NFTMetadata>("global_meta");
}

export function nft_create_metadata(index: u64, metadata: TokenMetadata): void {
  assert(validate_admin(), 'You are not authorized to run this function');
  TokenMetadataByIndex.set(index, metadata);
}

export function nft_mint(receiver_id: string, index: u64): u64 {
  assert(validate_admin(), 'You are not authorized to run this function');

  let next_token_id = storage.getPrimitive<u64>("counter_token_id", 0);
  storage.set<u64>("counter_token_id", next_token_id + 1);

  itemToMetadata.set(next_token_id, index)
  owner_items(receiver_id).add(next_token_id)
  /*const owner = accountToItems.get(owner_id)
  if (owner == null) {
    accountToItems.set(owner_id, new Set<u128>())
    accountToItems.getSome(owner_id).add(next_token_id)
  } else {
    owner.add(next_token_id)
  }*/
  //Do we need this for extra gas / storage?
  //itemToAccount.set(next_token_id, owner_id)
  return next_token_id;
}

// Simple transfer. Transfer a given `token_id` from current owner to
// `receiver_id`.
//
// Requirements
// * Caller of the method must attach a deposit of 1 yoctoⓃ for security purposes
// * Contract MUST panic if called by someone other than token owner or,
//   if using Approval Management, one of the approved accounts
// * `approval_id` is for use with Approval Management extension, see
//   that document for full explanation.
// * If using Approval Management, contract MUST nullify approved accounts on
//   successful transfer.
//
// Arguments:
// * `receiver_id`: the valid NEAR account receiving the token
// * `token_id`: the token to transfer
// * `approval_id`: expected approval ID. A number smaller than
//    2^53, and therefore representable as JSON. See Approval Management
//    standard for full explanation.
// * `memo` (optional): for use cases that may benefit from indexing or
//    providing information for a transfer
export function nft_transfer(receiver_id: string, token_id: u64, approval_id: u64=0, memo?: string|null) : void {
  assert(u128.from(context.attachedDeposit) == u128.from(1), 'Requires attached deposit of exactly 1 yoctoNEAR')
  const sender_id = context.predecessor

  assert(owner_items(sender_id).has(token_id) == true)

  owner_items(sender_id).delete(token_id)
  owner_items(receiver_id).add(token_id)
  logging.log(`transfer ${token_id} from ${sender_id} to ${receiver_id}`)
}

export function nft_token_metadata(token_id: u64): TokenMetadata|null {
    const index = itemToMetadata.getSome(token_id);
    return TokenMetadataByIndex.get(index);
}

export function nft_tokens_for_owner_set(account_id: string): Array<u64> {
  const owner_set = owner_items(account_id);
  if (owner_set == null) {
    return new Array<u64>();
  } else {
    return owner_set.values();
  }
}

//Do we need this? Extra gas
export function nft_token(token_id: u64): Token|null {
  return null;
}
export function nft_tokens_for_owner(account_id: string): Array<Token> {
    return new Array<Token>();
}
// END NEP-171