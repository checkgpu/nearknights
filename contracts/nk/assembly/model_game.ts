@nearBindgen
export class Char {
  account: string = "";
  exp: u64 = 0;
  exp_max: u64 = 0;
  gold: u64 = 0;
  hp_cur: i32 = 55; //con*20+level*15
  hp_max: i32 = 55;
  mp_cur: i32 = 30; //wis*3+level*8
  mp_max: i32 = 30;
  attack_speed: i32 = 1000; 
  damage: i32 = 0; //strchart level/10
  crit: i32 = 1_000; //
  weapon_dice: i32 = 0;
  weapon_dice_sides: i32 = 0;
  ac: i32 = 0; //dex chart
  hit: i32 = 0; //
  level: i32 = 1; //
  level_max: i32 = 1;
  er: i32 = 0; 
  dr: i32 = 0;
  mr: i32 = 0;
  potion_recovery_amount: i32 = 0;
  //carry: i32 = 3_600_000;
  carry: i32 = 100; //(100 * (level/5)) 
  red_potion: i32 = 16;
  hp_regen: i32 = 0;
  mp_regen: i32 = 0;
  mag_crit: i32 = 0;
  mag_bonus: i32 = 0;
  str: i32 = 12;
  dex: i32 = 12;
  int: i32 = 12; 
  con: i32 = 12; //300 * con
  wis: i32 = 12;
  bonus: i32 = 0;
  next_attack: i32 = 0;
  max_battles: i32 = 1;
  next_fight_block: u64 = 0;
  next_potion: i32 = 0;
  next_regen_tick: i32 = 7500;

  constructor(account: string) {
    this.account = account
  }

  clone(): Char {
    let o = this;
    let n = new Char(o.account)
    n.exp = o.exp;
    n.exp_max = o.exp_max;
    n.gold = o.gold;
    n.hp_cur = o.hp_cur;
    n.hp_max = o.hp_max;
    n.mp_cur = o.mp_cur;
    n.mp_max = o.mp_max;
    n.attack_speed = o.attack_speed;
    n.damage = o.damage;
    n.crit = o.crit;
    n.weapon_dice = o.weapon_dice;
    n.weapon_dice_sides = o.weapon_dice_sides;
    n.ac = o.ac;
    n.hit = o.hit;
    n.level = o.level;
    n.level_max = o.level_max;
    n.er = o.er;
    n.dr = o.dr;
    n.mr = o.mr;
    n.potion_recovery_amount = o.potion_recovery_amount;
    n.carry = o.carry;
    n.red_potion = o.red_potion;
    n.hp_regen = o.hp_regen;
    n.mp_regen = o.mp_regen;
    n.mag_crit = o.mag_crit;
    n.mag_bonus = o.mag_bonus;
    n.str = o.str;
    n.dex = o.dex;
    n.int = o.int;
    n.con = o.con;
    n.wis = o.wis;
    n.bonus = o.bonus;
    n.next_attack = o.next_attack;
    n.max_battles = o.max_battles;
    n.next_fight_block = o.next_fight_block;
    n.next_potion = o.next_potion;
    n.next_regen_tick = o.next_regen_tick;
    return n
  }
};

@nearBindgen
export class Item {
  id: u64 = 0;
  slot: string = "weapon";
  rarity: string = "common";
  enchant_level: i32 = 0;
  damage: i32 = 0;
  hit: i32 = 0;
  crit: i32 = 0;
  weapon_dice: i32 = 0;
  weapon_dice_sides: i32 = 0;
  undead_dice: i32 = 0;
  undead_dice_sides: i32 = 0;
  attack_speed: i32 = 0;
  hp_regen: i32 = 0;
  mp_regen: i32 = 0;
  ac: i32 = 0;
  dr: i32 = 0;
  er: i32 = 0;
  mr: i32 = 0;
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

export class Monster {
  id: u64 = 0;
  level: i32 = 0;
  hp_cur: i32 = 0;
  hp_max: i32 = 0;
  hp: i32 = 0;
  hp_regen: i32 = 0;
  mp_regen: i32 = 0;
  next_regen_tick: i32 = 7500;
  exp: i32 = 0;
  gold_dice: i32 = 0;
  gold_dice_sides: i32 = 0;
  damage: i32 = 0;
  hit: i32 = 0;
  crit: i32 = 0;
  weapon_dice: i32 = 0;
  weapon_dice_sides: i32 = 0;
  ac: i32 = 0;
  dr: i32 = 0;
  er: i32 = 0;
  attack_speed: i32 = 1000;
  next_attack: i32 = 0;
  preemptive: i32 = 0;
  ranged: i32 = 0;
  drop_table: Array<IndexChance> = new Array<IndexChance>();

  constructor(id: u64) {
    this.id = id;
  }

  clone(old: Monster): Monster {
    let n = new Monster(old.id)
    n.level = old.level;
    n.hp_cur = old.hp;
    n.hp_max = old.hp;
    n.hp = old.hp;
    n.hp_regen = old.hp_regen;
    n.mp_regen = old.mp_regen;
    n.exp = old.exp;
    n.gold_dice = old.gold_dice;
    n.gold_dice_sides = old.gold_dice_sides;
    n.damage = old.damage;
    n.hit = old.hit;
    n.crit = old.crit;
    n.weapon_dice = old.weapon_dice;
    n.weapon_dice_sides = old.weapon_dice_sides;
    n.ac = old.ac;
    n.dr = old.dr;
    n.er = old.er;
    n.attack_speed = old.attack_speed;
    n.next_attack = old.next_attack;
    n.preemptive = old.preemptive
    n.ranged = old.ranged
    n.drop_table = old.drop_table;
    return n;
  }
};

export class IndexChance {
  index: u64 = 0;
  chance: i32 = 0;

  constructor(index: u64, chance: i32) {
    this.index = index;
    this.chance = chance;
  }
};

export class Location {
  index: u64 = 0;
  level_req: i32 = 0;
  monsters: Array<IndexChance> = new Array<IndexChance>();

  constructor(index: u64, level_req: i32) {
    this.index = index;
    this.level_req = level_req;
  }
};