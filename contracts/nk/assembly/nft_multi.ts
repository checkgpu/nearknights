import { context, PersistentMap, PersistentSet, u128, ContractPromise, storage, env, util, logging } from "near-sdk-as"

//Big thanks to https://github.com/agar3s/spacewars13k-server for their AS NFT implmentation
import { Token, NFTMetadata, TokenMetadata } from "./model";
import { validate_admin, owner_items, add_item, remove_item } from "./stdlib";
import { get_item } from "./formulas/items"

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

export function nft_transfer(receiver_id: string, token_id: u64, approval_id: u64=0, memo?: string|null) : void {
  assert(u128.from(context.attachedDeposit) == u128.from(1), 'Requires attached deposit of exactly 1 yoctoNEAR')
  const sender_id = context.predecessor

  assert(owner_items(sender_id).has(token_id) == true)

  //TODO replace 1 if amount gets added to standard or we use multitoken standard
  remove_item(sender_id, token_id, 1)
  add_item(receiver_id, token_id, 1)

  logging.log(`transfer 1 ${token_id} from ${sender_id} to ${receiver_id}`)
}

export function nft_token_metadata(token_id: u64): TokenMetadata|null {
  let item = get_item(token_id)
  return new TokenMetadata(item.name, "", "", "", 1, "", "", "", "", "", "", "")
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