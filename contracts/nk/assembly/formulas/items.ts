import { Item } from "../model_game"

var item_100 = new Item(100);
item_100.attack_speed=160; item_100.id=100; item_100.name="Dagger"; item_100.slot="weapon"; item_100.texture="Dagger_01"; item_100.weapon_dice=1; item_100.weapon_dice_sides=2; 
var item_200 = new Item(200);
item_200.attack_speed=160; item_200.id=200; item_200.name="Goblin Shiv"; item_200.slot="weapon"; item_200.texture="Dagger_03"; item_200.weapon_dice=1; item_200.weapon_dice_sides=3; 
var item_300 = new Item(300);
item_300.attack_speed=160; item_300.id=300; item_300.name="Silver Dagger"; item_300.slot="weapon"; item_300.texture="Dagger_06"; item_300.undead_dice=1; item_300.undead_dice_sides=20; item_300.weapon_dice=1; item_300.weapon_dice_sides=3; 
var item_400 = new Item(400);
item_400.id=400; item_400.name="Gladius"; item_400.slot="weapon"; item_400.texture="Sword_03"; item_400.weapon_dice=1; item_400.weapon_dice_sides=6; 
var item_500 = new Item(500);
item_500.id=500; item_500.name="Silver Sword"; item_500.slot="weapon"; item_500.texture="Sword_17"; item_500.undead_dice=1; item_500.undead_dice_sides=20; item_500.weapon_dice=1; item_500.weapon_dice_sides=8; 
var item_600 = new Item(600);
item_600.hit=1; item_600.id=600; item_600.name="Katana"; item_600.slot="weapon"; item_600.texture="Sword_20"; item_600.weapon_dice=1; item_600.weapon_dice_sides=12; 
var item_700 = new Item(700);
item_700.attack_speed=-500; item_700.id=700; item_700.name="Orcish Axe"; item_700.slot="weapon"; item_700.texture="Axe_03"; item_700.weapon_dice=1; item_700.weapon_dice_sides=16; 
var item_10000 = new Item(10000);
item_10000.ac=1; item_10000.id=10000; item_10000.name="Wooden Shield"; item_10000.slot="shield"; item_10000.texture="shield_01"; 
var item_10100 = new Item(10100);
item_10100.ac=2; item_10100.id=10100; item_10100.name="Iron Plated Shield"; item_10100.slot="shield"; item_10100.texture="shield_04"; 
var item_10200 = new Item(10200);
item_10200.ac=3; item_10200.id=10200; item_10200.name="Iron Shield"; item_10200.slot="shield"; item_10200.texture="shield_16"; 
var item_20000 = new Item(20000);
item_20000.ac=2; item_20000.id=20000; item_20000.name="Goblin Ring Mail"; item_20000.slot="body"; item_20000.texture="Chest_18"; 
var item_20100 = new Item(20100);
item_20100.ac=3; item_20100.id=20100; item_20100.name="Orcish Ring Mail"; item_20100.slot="body"; item_20100.texture="Chest_19"; 
var item_20200 = new Item(20200);
item_20200.ac=4; item_20200.id=20200; item_20200.name="Russet Armor"; item_20200.slot="body"; item_20200.texture="Chest_36"; 
var item_20300 = new Item(20300);
item_20300.ac=6; item_20300.id=20300; item_20300.name="Platemail"; item_20300.slot="body"; item_20300.texture="Chest_71"; 
var item_30000 = new Item(30000);
item_30000.ac=0; item_30000.id=30000; item_30000.name="Shirt"; item_30000.slot="shirt"; item_30000.texture="Chest_01"; 
var item_30100 = new Item(30100);
item_30100.ac=0; item_30100.id=30100; item_30100.name="Shirt of Strength"; item_30100.slot="shirt"; item_30100.str=1; item_30100.texture="Chest_06";  
var item_30200 = new Item(30200);
item_30200.ac=1; item_30200.damage=1; item_30200.id=30200; item_30200.name="Shirt of Power"; item_30200.slot="shirt"; item_30200.str=1; item_30200.texture="Chest_11"; 
var item_40000 = new Item(40000);
item_40000.ac=0; item_40000.id=40000; item_40000.name="Leather Gloves"; item_40000.slot="gloves"; item_40000.texture="Gloves_01"; 
var item_40100 = new Item(40100);
item_40100.ac=1; item_40100.id=40100; item_40100.name="Iron Gloves"; item_40100.slot="gloves"; item_40100.texture="Gloves_07"; 
var item_40200 = new Item(40200);
item_40200.ac=0; item_40200.er=1; item_40200.hit=1; item_40200.id=40200; item_40200.name="Wristwraps"; item_40200.slot="gloves"; item_40200.texture="Gloves_18"; 
var item_40300 = new Item(40300);
item_40300.ac=4; item_40300.attack_speed=60; item_40300.damage=2; item_40300.id=40300; item_40300.name="Death Knight Gloves"; item_40300.slot="gloves"; item_40300.texture="12_Mail_gloves"; 
var item_50000 = new Item(50000);
item_50000.ac=1; item_50000.id=50000; item_50000.name="Leather Boots"; item_50000.slot="boots"; item_50000.texture="Boots_04"; 
var item_50100 = new Item(50100);
item_50100.ac=2; item_50100.id=50100; item_50100.name="Iron Boots"; item_50100.slot="boots"; item_50100.texture="Boots_11"; 
var item_60000 = new Item(60000);
item_60000.ac=1; item_60000.id=60000; item_60000.name="Iron Cap"; item_60000.slot="head"; item_60000.texture="Helm_06"; 
var item_60100 = new Item(60100);
item_60100.ac=2; item_60100.id=60100; item_60100.name="Iron Helmet"; item_60100.slot="head"; item_60100.texture="Helm_01"; 
var item_70000 = new Item(70000);
item_70000.ac=1; item_70000.id=70000; item_70000.mr=6; item_70000.name="Cloak of Magic Resistance"; item_70000.slot="cloak"; item_70000.texture="Back_14"; 
var item_70100 = new Item(70100);
item_70100.ac=2; item_70100.id=70100; item_70100.name="Cloak of Protection"; item_70100.slot="cloak"; item_70100.texture="Back_15"; 
var item_80000 = new Item(80000);
item_80000.ac=1; item_80000.id=80000; item_80000.name="Leather Pants"; item_80000.slot="legs"; item_80000.texture="Pants_08"; 
var item_80100 = new Item(80100);
item_80100.ac=2; item_80100.id=80100; item_80100.name="Iron Pants"; item_80100.slot="legs"; item_80100.texture="Pants_14"; 
var item_80200 = new Item(80200);
item_80200.ac=2; item_80200.id=80200; item_80200.mr=3; item_80200.name="Magic Resistant Pants"; item_80200.slot="legs"; item_80200.texture="Pants_18"; 
var item_90000 = new Item(90000);
item_90000.id=90000; item_90000.name="Strength Amulet"; item_90000.slot="neck"; item_90000.str=1; item_90000.texture="necklace_14"; 
var item_90100 = new Item(90100);
item_90100.dex=1; item_90100.id=90100; item_90100.name="Dexterity Amulet"; item_90100.slot="neck"; item_90100.texture="necklace_15"; 
var item_90200 = new Item(90200);
item_90200.id=90200; item_90200.int=1; item_90200.name="Intelligence Amulet"; item_90200.slot="neck"; item_90200.texture="necklace_17"; 
var item_100000 = new Item(100000);
item_100000.hp_regen=2; item_100000.id=100000; item_100000.name="Ring of Health"; item_100000.slot="ring"; item_100000.texture="Ring_04"; 
var item_100100 = new Item(100100);
item_100100.id=100100; item_100100.mp_regen=1; item_100100.name="Ring of Mana"; item_100100.slot="ring"; item_100100.texture="Ring_05"; 
var item_1000000 = new Item(1000000);
item_1000000.id=1000000; item_1000000.name="Enchant Gear Rune"; item_1000000.texture="Enchantment_47_rune_stoune"; 
var item_1000100 = new Item(1000100);
item_1000100.id=1000100; item_1000100.name="Blessed Enchant Gear Rune"; item_1000100.texture="Enchantment_48_rune_stoune"; 
var item_2000000 = new Item(2000000);
item_2000000.id=2000000; item_2000000.name="Codex: Reflexes"; item_2000000.texture="Book_1"; 
var item_2000100 = new Item(2000100);
item_2000100.id=2000100; item_2000100.name="Codex: Power"; item_2000100.texture="Book_2"; 
var item_2000200 = new Item(2000200);
item_2000200.id=2000200; item_2000200.name="Codex: Meditation"; item_2000200.texture="Book_10"; 
var item_2000300 = new Item(2000300); 
item_2000300.id=2000300; item_2000300.name="Spellbook: Bless Weapon"; item_2000300.texture="Book_22"; 
var item_2000400 = new Item(2000400);
item_2000400.id=2000400; item_2000400.name="Spellbook: Iron Skin"; item_2000400.texture="Book_5"; 
var item_6000000 = new Item(6000000);
item_6000000.id=6000000; item_6000000.name="Hero Gacha"; item_6000000.texture="Blacksmith_13_leather_patch"; 
var item_6000100 = new Item(6000100);
item_6000100.id=6000100; item_6000100.name="Hero Gacha Premium"; item_6000100.texture="Blacksmith_19_flake_patch"; 
var item_6000200 = new Item(6000200);
item_6000200.id=6000200; item_6000200.name="Hero Gacha Epic"; item_6000200.texture="Blacksmith_20_rune_patch"; 

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