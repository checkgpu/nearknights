import { context, PersistentMap, PersistentSet, u128, ContractPromise, storage, env, util, logging } from "near-sdk-as"
import { NFTMetadata, TokenMetadata } from "./model";
import { Char } from "./model_game";
import { add_item, ONE_NEAR, equip_item as equip_item_i } from "./stdlib";

import { 
    init as init_i,
    nft_metadata as nft_metadata_i,
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
    heroMap
} from './battle';

import { 
  calc_char_stats,
  stat_add as stat_add_i,
  stat_preview as stat_preview_i,
  create_knight as create_knight_i,
  revive as revive_i,
} from "./formulas/char";

import { gacha_pull as gacha_pull_i } from "./formulas/gacha"
import { 
  shop_buy as shop_buy_i,
  shop_check_limit as shop_check_limit_i,
  shop_buy_gold as shop_buy_gold_i,
} from "./formulas/shop"

export function fix(): void {
}

// VIEW
export function hero(accountId: string): Char {  
  var hero = heroMap.get(accountId)
  if (!hero) {
    hero = new Char(accountId);
    hero.account = ""
  }
  calc_char_stats(hero)
  return hero;
}

// CALL
export function create_knight(): Char {
  return create_knight_i();
}

export function revive(): void {
  revive_i();
}

export function battle(location: i32, count: i32): void {
  var hero = heroMap.getSome(context.sender)
  battle_i(hero, location, count)
}

export function stat_add(stat: i32): Char {
  return stat_add_i(stat)
}

export function stat_preview(stat: i32): Char {
  return stat_preview_i(stat)
}

// INVENTORY
export function equip_item(index: u64): Char {
  let owner_id = context.sender;
  let removed_item = equip_item_i(owner_id, index);
  let char = hero(owner_id);
  char.extra1 = removed_item;
  return char;
}

export function gacha_pull(index: u64): void {
  gacha_pull_i(index)
}

export function shop_buy_gold(accountId: string, stack_count: i32): u64 {
  return shop_buy_gold_i(accountId, stack_count)
}

export function shop_buy(index: u64): void {
  shop_buy_i(index)
}

export function shop_check_limit(accountId: string, index: u64): u64 {
  return shop_check_limit_i(accountId, index)
}

//NEP-171
export function init(owner_id: string, metadata: NFTMetadata): void {
  init_i(owner_id, metadata)
}

export function nft_metadata(): NFTMetadata {
  return nft_metadata_i()
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
