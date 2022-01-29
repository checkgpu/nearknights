import { storage, context, u128, logging } from "near-sdk-as"
import { time_second, add_item, ONE_NEAR } from "../stdlib"
import { heroMap }  from '../battle';

/*
const SHOP = {
    1: {name: "Enchant Gear Rune", item_id: 1_000_000, limit: 3, reset_time: 23*60*60, cost: 3_000, currency: "gold"},
    10: {name: "Hero Gacha", item_id: 6_000_000, limit: 1, reset_time: 23*60*60, cost: 3_000, currency: "gold"},
    1000: {name: "Hero Gacha", item_id: 6_000_000, limit: 99999, reset_time: 23*60*60, cost: 1, currency: "diamond"},
    1001: {name: "Hero Gacha Premium", item_id: 6_000_100, limit: 1, reset_time: 23*60*60, cost: 1, currency: "diamond"},
}
*/

export class ShopItem {
  index: u64 = 0;
  name: string = "";
  item_id: u64 = 0;
  limit: u64 = 0;
  cost: u64 = 0;
  reset_time: u64 = 0;
  currency: string = "";

  constructor(index: u64) {
    this.index = index;
  }
};

var shop_1 = new ShopItem(1);
shop_1.name="Enchant Gear Rune"; shop_1.item_id=1_000_000; shop_1.limit=3; shop_1.reset_time=23*60*60; shop_1.cost=3_000; shop_1.currency="gold";
var shop_10 = new ShopItem(10);
shop_10.name="Hero Gacha"; shop_10.item_id=6_000_000; shop_10.limit=1; shop_10.reset_time=23*60*60; shop_10.cost=3_000; shop_10.currency="gold";
var shop_1000 = new ShopItem(1000);
shop_1000.name="Hero Gacha"; shop_1000.item_id=6_000_000; shop_1000.limit=99999; shop_1000.reset_time=23*60*60; shop_1000.cost=1; shop_1000.currency="diamond";
var shop_1001 = new ShopItem(1001);
shop_1001.name="Hero Gacha Premium"; shop_1001.item_id=6_000_100; shop_1001.limit=1; shop_1001.reset_time=23*60*60; shop_1001.cost=1; shop_1001.currency="diamond";

const SHOP = new Map<u64, ShopItem>()
SHOP.set(1, shop_1)
SHOP.set(10, shop_10)
SHOP.set(1000, shop_1000)
SHOP.set(1001, shop_1001)

export function get_shop(index: u64): ShopItem {
    if (SHOP.has(index)) {
        return SHOP.get(index);
    }
    assert(false, "invalid shop item")
    return SHOP.get(1);
}

export function shop_buy_gold(accountId: string, stack_count: i32): u64 {
    let total_gold = stack_count*1_000
    let near_units = context.attachedDeposit / ONE_NEAR
    assert(stack_count >= 1, "must buy more than 1k gold")
    assert(near_units >= u128.from(stack_count), "not enough NEAR attached to buy gold")
    var hero = heroMap.getSome(accountId)
    hero.gold += total_gold
    heroMap.set(accountId, hero);
    return hero.gold
}

export function shop_buy(index: u64): void {
    let accountId = context.sender
    let limit_remaining = shop_check_limit(accountId, index)
    assert(limit_remaining > 0, "you have used up your limits for the interval")
    let log = ""
    let info = get_shop(index)

    if (info.currency == "gold") {
        var hero = heroMap.getSome(accountId)
        assert(hero.gold >= info.cost, "not enough gold")
        hero.gold -= info.cost
        heroMap.set(accountId, hero);
        log += `gg -${info.cost};`
    } else if (info.currency == "diamond") {
        let near_units = context.attachedDeposit / ONE_NEAR
        assert(near_units >= u128.from(info.cost), "not enough NEAR attached to buy from shop")
        logging.log(`gd -${info.cost};`)
    } else {
        assert(false, "something wrong")
    }

    add_item(accountId, info.item_id, 1)
    log += `gi ${info.item_id} 1;`
    logging.log(log)

    storage.set<u64>(`shopLimitMap::${accountId}::${index}`, (info.limit-limit_remaining)+1)
    if (limit_remaining == info.limit) {
        let seconds = time_second();
        storage.set<u64>(`shopLimitResetMap::${accountId}::${index}`, seconds+info.reset_time)
    }
}

export function shop_check_limit(accountId: string, index: u64): u64 {
    let info = get_shop(index)
    let limit_used = storage.getPrimitive<u64>(`shopLimitMap::${accountId}::${index}`, 0);
    let limit_max = info.limit
    let delta = limit_max - limit_used
    if (delta > 0) {
        return delta;
    }

    let limit_expire = storage.getPrimitive<u64>(`shopLimitResetMap::${accountId}::${index}`, 0);
    let seconds = time_second();
    if (seconds >= limit_expire) {
        return limit_max;
    }
    return 0;
}