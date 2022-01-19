@nearBindgen
export class Char {
  exp: u64 = 0;
  gold: u64 = 0;
  hp_cur: i32 = 233; //con*20+level*15
  hp_max: i32 = 233;
  mp_cur: i32 = 30; //wis*3+level*8
  mp_max: i32 = 30;
  attack_speed: i32 = 1000; 
  damage: i32 = 3; //strchart level/10
  crit: i32 = 1000; //
  weapon_dice: i32 = 0;
  weapon_dice_sides: i32 = 0;
  ac: i32 = 0; //dex chart
  hit: i32 = 12; //
  level: i32 = 1; //
  max_level: i32 = 1;
  er: i32 = 1; 
  dr: i32 = 0;
  mr: i32 = 0;
  potion_recovery_amount: i32 = 0;
  //carry: i32 = 3_600_000;
  carry: i32 = 100; //(100 * (level/5)) 
  red_potion: i32 = 12;
  hp_rec: i32 = 3;
  mp_rec: i32 = 3;
  mag_crit: i32 = 1;
  mag_bonus: i32 = 1;
  str: i32 = 12;
  dex: i32 = 12;
  int: i32 = 12; 
  con: i32 = 12; //300 * con
  wis: i32 = 12;
  bonus: i32 = 0;
};

@nearBindgen
export class Item {
  id: u64 = 0;
  slot: string = "weapon";
  damage: i32 = 0;
  hit: i32 = 0;
  crit: i32 = 0;
  weapon_dice: i32 = 0;
  weapon_dice_sides: i32 = 0;
  undead_dice_sides: i32 = 0;
  ac: i32 = 0;
  dr: i32 = 0;
  er: i32 = 0;
  carry: i32 = 0;
  str: i32 = 0;
  dex: i32 = 0;
  int: i32 = 0;
  con: i32 = 0;
  wis: i32 = 0;

  constructor(id: u64) {
    this.id = id;
  }
};

var dagger = new Item(1);
dagger.slot="weapon"; dagger.weapon_dice=1; dagger.weapon_dice_sides = 2; 
var orc_dagger = new Item(2);
orc_dagger.slot="weapon"; orc_dagger.weapon_dice=1; orc_dagger.weapon_dice_sides = 3; 
var silver_sword = new Item(3);
silver_sword.slot="weapon"; silver_sword.weapon_dice=1; silver_sword.weapon_dice_sides=8; silver_sword.undead_dice_sides=20;

const items = new Map<u64, Item>()
items.set(1, dagger)
items.set(2, orc_dagger)
items.set(3, silver_sword)

export function get_item_slot(index: u64): string {
    let slot = items.get(index).slot;
    if (slot != null) {
        return slot;
    } else {
        assert(false, "Undefined item")
        return "";
    }
}