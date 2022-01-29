import { Item } from "../model_game"

var item_100 = new Item(100);
item_100.attack_speed=160; item_100.id=100; item_100.slot="weapon"; item_100.weapon_dice=1; item_100.weapon_dice_sides=2; 
var item_200 = new Item(200);
item_200.attack_speed=160; item_200.id=200; item_200.slot="weapon"; item_200.weapon_dice=1; item_200.weapon_dice_sides=3; 
var item_300 = new Item(300);
item_300.attack_speed=160; item_300.id=300; item_300.slot="weapon"; item_300.undead_dice=1; item_300.undead_dice_sides=20; item_300.weapon_dice=1; item_300.weapon_dice_sides=3; 
var item_400 = new Item(400);
item_400.id=400; item_400.slot="weapon"; item_400.weapon_dice=1; item_400.weapon_dice_sides=6; 
var item_500 = new Item(500);
item_500.id=500; item_500.slot="weapon"; item_500.undead_dice=1; item_500.undead_dice_sides=20; item_500.weapon_dice=1; item_500.weapon_dice_sides=8; 
var item_600 = new Item(600);
item_600.hit=1; item_600.id=600; item_600.slot="weapon"; item_600.weapon_dice=1; item_600.weapon_dice_sides=12; 
var item_700 = new Item(700);
item_700.attack_speed=-500; item_700.id=700; item_700.slot="weapon"; item_700.weapon_dice=1; item_700.weapon_dice_sides=16; 
var item_10000 = new Item(10000);
item_10000.ac=1; item_10000.id=10000; item_10000.slot="shield"; 
var item_10100 = new Item(10100);
item_10100.ac=2; item_10100.id=10100; item_10100.slot="shield"; 
var item_10200 = new Item(10200);
item_10200.ac=3; item_10200.id=10200; item_10200.slot="shield"; 
var item_20000 = new Item(20000);
item_20000.ac=2; item_20000.id=20000; item_20000.slot="body"; 
var item_20100 = new Item(20100);
item_20100.ac=3; item_20100.id=20100; item_20100.slot="body"; 
var item_20200 = new Item(20200);
item_20200.ac=4; item_20200.id=20200; item_20200.slot="body"; 
var item_20300 = new Item(20300);
item_20300.ac=6; item_20300.id=20300; item_20300.slot="body"; 
var item_30000 = new Item(30000);
item_30000.ac=0; item_30000.id=30000; item_30000.slot="shirt"; 
var item_30100 = new Item(30100);
item_30100.ac=0; item_30100.id=30100; item_30100.slot="shirt"; item_30100.str=1; 
var item_30200 = new Item(30200);
item_30200.ac=1; item_30200.damage=1; item_30200.id=30200; item_30200.slot="shirt"; item_30200.str=1; 
var item_40000 = new Item(40000);
item_40000.ac=0; item_40000.id=40000; item_40000.slot="gloves"; 
var item_40100 = new Item(40100);
item_40100.ac=1; item_40100.id=40100; item_40100.slot="gloves"; 
var item_40200 = new Item(40200);
item_40200.ac=0; item_40200.er=1; item_40200.hit=1; item_40200.id=40200; item_40200.slot="gloves"; 
var item_40300 = new Item(40300);
item_40300.ac=4; item_40300.attack_speed=60; item_40300.damage=2; item_40300.id=40300; item_40300.slot="gloves"; 
var item_50000 = new Item(50000);
item_50000.ac=1; item_50000.id=50000; item_50000.slot="boots"; 
var item_50100 = new Item(50100);
item_50100.ac=2; item_50100.id=50100; item_50100.slot="boots"; 
var item_60000 = new Item(60000);
item_60000.ac=1; item_60000.id=60000; item_60000.slot="head"; 
var item_60100 = new Item(60100);
item_60100.ac=2; item_60100.id=60100; item_60100.slot="head"; 
var item_70000 = new Item(70000);
item_70000.ac=1; item_70000.id=70000; item_70000.mr=6; item_70000.slot="cloak"; 
var item_70100 = new Item(70100);
item_70100.ac=2; item_70100.id=70100; item_70100.slot="cloak"; 
var item_80000 = new Item(80000);
item_80000.ac=1; item_80000.id=80000; item_80000.slot="legs"; 
var item_80100 = new Item(80100);
item_80100.ac=2; item_80100.id=80100; item_80100.slot="legs"; 
var item_80200 = new Item(80200);
item_80200.ac=2; item_80200.id=80200; item_80200.mr=3; item_80200.slot="legs"; 
var item_90000 = new Item(90000);
item_90000.id=90000; item_90000.slot="neck"; item_90000.str=1; 
var item_90100 = new Item(90100);
item_90100.dex=1; item_90100.id=90100; item_90100.slot="neck"; 
var item_90200 = new Item(90200);
item_90200.id=90200; item_90200.int=1; item_90200.slot="neck"; 
var item_100000 = new Item(100000);
item_100000.hp_regen=2; item_100000.id=100000; item_100000.slot="ring"; 
var item_100100 = new Item(100100);
item_100100.id=100100; item_100100.mp_regen=1; item_100100.slot="ring"; 
var item_1000000 = new Item(1000000);
item_1000000.id=1000000; 
var item_1000100 = new Item(1000100);
item_1000100.id=1000100; 
var item_2000000 = new Item(2000000);
item_2000000.id=2000000; 
var item_2000100 = new Item(2000100);
item_2000100.id=2000100; 
var item_2000200 = new Item(2000200);
item_2000200.id=2000200; 
var item_2000300 = new Item(2000300);
item_2000300.id=2000300; 
var item_2000400 = new Item(2000400);
item_2000400.id=2000400; 
var item_6000000 = new Item(6000000);
item_6000000.id=6000000; 
var item_6000100 = new Item(6000100);
item_6000100.id=6000100; 
var item_6000200 = new Item(6000200);
item_6000200.id=6000200; 

const items = new Map<u64, Item>()
items.set(100, item_100)
items.set(200, item_200)
items.set(300, item_300)
items.set(400, item_400)
items.set(500, item_500)
items.set(600, item_600)
items.set(700, item_700)
items.set(10000, item_10000)
items.set(10100, item_10100)
items.set(10200, item_10200)
items.set(20000, item_20000)
items.set(20100, item_20100)
items.set(20200, item_20200)
items.set(20300, item_20300)
items.set(30000, item_30000)
items.set(30100, item_30100)
items.set(30200, item_30200)
items.set(40000, item_40000)
items.set(40100, item_40100)
items.set(40200, item_40200)
items.set(40300, item_40300)
items.set(50000, item_50000)
items.set(50100, item_50100)
items.set(60000, item_60000)
items.set(60100, item_60100)
items.set(70000, item_70000)
items.set(70100, item_70100)
items.set(80000, item_80000)
items.set(80100, item_80100)
items.set(80200, item_80200)
items.set(90000, item_90000)
items.set(90100, item_90100)
items.set(90200, item_90200)
items.set(100000, item_100000)
items.set(100100, item_100100)
items.set(1000000, item_1000000)
items.set(1000100, item_1000100)
items.set(2000000, item_2000000)
items.set(2000100, item_2000100)
items.set(2000200, item_2000200)
items.set(2000300, item_2000300)
items.set(2000400, item_2000400)
items.set(6000000, item_6000000)
items.set(6000100, item_6000100)
items.set(6000200, item_6000200)

export function get_item(index: u64): Item {
    let item = items.get(index);
    if (item != null) {
        return item;
    } else {
        assert(false, "Undefined item")
        return new Item(1);
    }
}