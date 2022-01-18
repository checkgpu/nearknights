import { context, PersistentMap, PersistentSet, u128, ContractPromise, storage, env, util, logging } from "near-sdk-as"
import { owner_items, itemToMetadata } from "./stdlib";
import { AuctionItem } from "./model";

const itemMarket = new PersistentMap<u64, AuctionItem>("itemMarket");

export function nft_market_sell(token_id: u64, price: u128): void {
    const has_token = owner_items(context.sender).has(token_id)
    assert(has_token == true, "nft does not exist under this user")
    assert(price >= TWO_CENT, "minimum listing price 0.02 NEAR")
    owner_items(context.sender).delete(token_id)
    const index = itemToMetadata.getSome(token_id)

    let auction_item: AuctionItem = {
      token_id: token_id,
      index: index,
      owner_id: context.sender,
      price: price,
      block_listed: context.blockIndex
    };
    itemMarket.set(token_id, auction_item)
}

export function nft_market_buy(token_id: u64): void {
    const aucitem = itemMarket.getSome(token_id)
    assert(context.attachedDeposit >= aucitem.price, "not enough NEAR attached to buy")
    itemMarket.delete(token_id)
    owner_items(context.sender).add(token_id)
    if (context.attachedDeposit > aucitem.price) {
        const overpay_refund = context.attachedDeposit - aucitem.price
        _nft_market_buy_refund(context.sender, overpay_refund)
    }
    //10% commission
    var calc_commision = u128.mul(aucitem.price, u128.from(100))
    calc_commision = u128.div(calc_commision, u128.from(10))
    calc_commision = u128.div(calc_commision, u128.from(100))
    logging.log(`${context.sender} bought ${token_id} from ${aucitem.owner_id} for ${aucitem.price} commission was ${calc_commision}`)
    _nft_market_buy_refund(aucitem.owner_id, aucitem.price - calc_commision)
}

export function nft_market_cancel(token_id: u64): void {
    const aucitem = itemMarket.getSome(token_id)
    assert(context.sender == aucitem.owner_id, "you are not the owner")
    itemMarket.delete(token_id)
    owner_items(aucitem.owner_id).add(token_id)
}

function _nft_market_buy_refund(account_id: string, amount: u128) : void {
    const accountIdArr = util.stringToBytes(account_id)
    const promise_id: u64 = env.promise_batch_create(accountIdArr.byteLength, accountIdArr.dataStart)
    const amountArr = amount.toUint8Array()
    env.promise_batch_action_transfer(promise_id, amountArr.dataStart)
}
