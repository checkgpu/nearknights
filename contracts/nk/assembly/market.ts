import { context, PersistentMap, PersistentSet, u128, ContractPromise, storage, env, util, logging } from "near-sdk-as"
import { TWO_CENT, owner_items, owner_items_count, add_item, remove_item } from "./stdlib";
import { AuctionItem } from "./model";

const itemMarket = new PersistentMap<u64, AuctionItem>("itemMarket");

export function nft_market_sell(index: u64, price: u128, amount: u64): u64 {
    const count = owner_items_count(context.sender, index)
    assert(count > 0, "nft does not exist under this user")
    assert(price >= TWO_CENT, "minimum listing price 0.02 NEAR")
    assert(amount == 1, "only 1 item at a time currently allowed to be sold")

    remove_item(context.sender, index, amount)

    let next_sale_id = storage.getPrimitive<u64>("counter_sale_id", 0);
    storage.set<u64>("counter_sale_id", next_sale_id + 1);

    let auction_item: AuctionItem = {
      sale_id: next_sale_id,
      owner_id: context.sender,
      index: index,
      price: price,
      amount: amount,
      block_listed: context.blockIndex
    };
    itemMarket.set(next_sale_id, auction_item)
    return next_sale_id
}

export function nft_market_buy(sale_id: u64): void {
    const aucitem = itemMarket.getSome(sale_id)
    assert(context.attachedDeposit >= aucitem.price, "not enough NEAR attached to buy")
    itemMarket.delete(sale_id)
    add_item(context.sender, aucitem.index, aucitem.amount)
    if (context.attachedDeposit > aucitem.price) {
        const overpay_refund = context.attachedDeposit - aucitem.price
        _nft_market_buy_refund(context.sender, overpay_refund)
    }
    //5% commission
    var calc_commision = u128.mul(aucitem.price, u128.from(100))
    calc_commision = u128.div(calc_commision, u128.from(20))
    calc_commision = u128.div(calc_commision, u128.from(100))
    let str1 = `${context.sender} bought auction ${sale_id} with item ${aucitem.index} (${aucitem.amount}) from`
    logging.log(`${str1} ${aucitem.owner_id} for ${aucitem.price} commission was ${calc_commision}`)
    _nft_market_buy_refund(aucitem.owner_id, aucitem.price - calc_commision)
}

export function nft_market_cancel(sale_id: u64): void {
    const aucitem = itemMarket.getSome(sale_id)
    assert(context.sender == aucitem.owner_id, "you are not the owner")
    itemMarket.delete(sale_id)
    add_item(aucitem.owner_id, aucitem.index, aucitem.amount)
}

function _nft_market_buy_refund(account_id: string, amount: u128) : void {
    const accountIdArr = util.stringToBytes(account_id)
    const promise_id: u64 = env.promise_batch_create(accountIdArr.byteLength, accountIdArr.dataStart)
    const amountArr = amount.toUint8Array()
    env.promise_batch_action_transfer(promise_id, amountArr.dataStart)
}
