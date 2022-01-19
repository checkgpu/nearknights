import { context, PersistentMap, PersistentSet, u128, ContractPromise, storage, env, util, logging } from "near-sdk-as"
import { NFTMetadata, TokenMetadata } from "./model";
import { Char } from "./model_game";
import { CombatStep } from "./battle";

import { 
    init as init_i,
    nft_metadata as nft_metadata_i,
    nft_create_metadata as nft_create_metadata_i,
    nft_mint as nft_mint_i,
    nft_transfer as nft_transfer_i,
    nft_token_metadata as nft_token_metadata_i,
    nft_tokens_for_owner_set as nft_tokens_for_owner_set_i,
    nft_token as nft_token_i,
    nft_tokens_for_owner as nft_tokens_for_owner_i
} from './nft_multi';

import { 
    nft_market_sell as nft_market_sell_i,
    nft_market_buy as nft_market_buy_i,
    nft_market_cancel as nft_market_cancel_i,
} from './market';

import { 
    battle as battle_i,
    create_knight as create_knight_i,
    create_knight_override as create_knight_override_i
}  from './battle';

export function create_knight(): Char {
  return create_knight_override_i();
}

export function battle(location: i32, count: i32): Array<CombatStep> {
  let battle_steps = battle_i(location, count)
  return battle_steps;
}

//NEP-171
export function init(owner_id: string, metadata: NFTMetadata): void {
  init_i(owner_id, metadata)
}

export function nft_metadata(): NFTMetadata {
  return nft_metadata_i()
}

export function nft_create_metadata(index: u64, metadata: TokenMetadata): void {
  nft_create_metadata_i(index, metadata)
}

export function nft_mint(receiver_id: string, index: u64, amount: u64): u64 {
  return nft_mint_i(receiver_id, index, amount)
}

export function nft_transfer(receiver_id: string, token_id: u64, approval_id: u64=0, memo?: string|null) : void {
  nft_transfer_i(receiver_id, token_id, approval_id, memo)
}

export function nft_token_metadata(token_id: u64): TokenMetadata|null {
  return nft_token_metadata_i(token_id)
}

export function nft_tokens_for_owner_set(account_id: string): Array<u64> {
  return nft_tokens_for_owner_set_i(account_id)
}

//MARKET MULTIFUNGIBLE
export function nft_market_sell(index: u64, price: u128, amount: u64): void {
  nft_market_sell_i(index, price, amount)
}

export function nft_market_buy(sale_id: u64): void {
  nft_market_buy_i(sale_id)
}

export function nft_market_cancel(sale_id: u64): void {
  nft_market_cancel_i(sale_id)
}
