import { context, PersistentMap, PersistentSet, u128, ContractPromise, storage, env, util, logging } from "near-sdk-as"
import { NFTMetadata, TokenMetadata } from "./model";
import { Char } from "./model_game";
import { calc_char_stats } from "./formulas/char";
import { add_item, ONE_NEAR, equip_item as equip_item_i } from "./stdlib";

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
    revive as revive_i,
    heroMap
}  from './battle';

//export function create_knight(): void {
//  create_knight_i();
//}

export function revive(): void {
  revive_i();
}

export function battle(location: i32, count: i32): void {
  var hero = heroMap.get(context.sender)
  if (!hero) {
    hero = create_knight_i()
  }
  battle_i(hero, location, count)
}

export function hero(accountId: string): Char {  
  var hero = heroMap.get(accountId)
  if (!hero) {
    return new Char("")
  }
  calc_char_stats(hero)
  return hero;
}

export function buy_gold(accountId: string, stack_count: i32): u64 {
  let total_gold = stack_count*1_000
  let near_units = context.attachedDeposit / ONE_NEAR
  assert(stack_count >= 1, "must buy more than 1k gold")
  assert(near_units >= u128.from(stack_count), "not enough NEAR attached to buy gold")
  var hero = heroMap.getSome(accountId)
  hero.gold += total_gold
  heroMap.set(accountId, hero);
  return hero.gold
}

export function fix(): void {
}

export function equip_item(index: u64): Char {
  let owner_id = context.sender;
  let removed_item = equip_item_i(owner_id, index);
  let char = hero(owner_id);
  char.extra1 = removed_item;
  return char;
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
