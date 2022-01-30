import { Monster, IndexChance } from "../model_game"

var mob_1 = new Monster(1);
mob_1.ac=6; mob_1.drop_table=[new IndexChance(100000, 10),new IndexChance(10000, 1500),new IndexChance(200, 2200)]; mob_1.exp=5; mob_1.hit=1; mob_1.hp=18; mob_1.id=1; mob_1.level=2; 
var mob_2 = new Monster(2);
mob_2.ac=8; mob_2.drop_table=[new IndexChance(100000, 10),new IndexChance(40200, 450),new IndexChance(20000, 1500)]; mob_2.exp=8; mob_2.hit=2; mob_2.hp=28; mob_2.id=2; mob_2.level=4; mob_2.preemptive=1; mob_2.ranged=1; 
var mob_3 = new Monster(3);
mob_3.ac=8; mob_3.drop_table=[new IndexChance(100000, 10),new IndexChance(10000, 500),new IndexChance(60000, 1500),new IndexChance(20000, 1600)]; mob_3.exp=8; mob_3.hit=2; mob_3.hp=28; mob_3.id=3; mob_3.level=4; mob_3.preemptive=1; 
var mob_4 = new Monster(4);
mob_4.ac=9; mob_4.dr=1; mob_4.drop_table=[new IndexChance(40300, 1),new IndexChance(100000, 20),new IndexChance(1000000, 120),new IndexChance(70100, 900),new IndexChance(400, 1600)]; mob_4.exp=16; mob_4.hit=3; mob_4.hp=56; mob_4.id=4; mob_4.level=8; 
var mob_5 = new Monster(5);
mob_5.ac=7; mob_5.drop_table=[new IndexChance(1000100, 1),new IndexChance(40300, 1),new IndexChance(100100, 20),new IndexChance(1000000, 240),new IndexChance(90200, 300),new IndexChance(70000, 450)]; mob_5.exp=16; mob_5.hit=5; mob_5.hp=34; mob_5.id=5; mob_5.level=6; 
var mob_10 = new Monster(10);
mob_10.ac=12; mob_10.drop_table=[new IndexChance(100000, 10),new IndexChance(90100, 11),new IndexChance(80100, 350),new IndexChance(500, 460),new IndexChance(20100, 900)]; mob_10.exp=16; mob_10.hp=56; mob_10.id=10; mob_10.level=7; 
var mob_11 = new Monster(11);
mob_11.ac=12; mob_11.dr=1; mob_11.drop_table=[new IndexChance(100000, 10),new IndexChance(90100, 11),new IndexChance(700, 450),new IndexChance(20100, 900)]; mob_11.exp=18; mob_11.hp=66; mob_11.id=11; mob_11.level=8; 
var mob_12 = new Monster(12);
mob_12.ac=10; mob_12.drop_table=[new IndexChance(100000, 10),new IndexChance(90100, 11),new IndexChance(80000, 900),new IndexChance(50000, 900)]; mob_12.exp=20; mob_12.hit=2; mob_12.hp=46; mob_12.id=12; mob_12.level=9; mob_12.preemptive=1; mob_12.ranged=1; 
var mob_13 = new Monster(13);
mob_13.ac=15; mob_13.drop_table=[new IndexChance(1000100, 1),new IndexChance(40300, 1),new IndexChance(100100, 40),new IndexChance(1000000, 290),new IndexChance(90200, 460),new IndexChance(30100, 600),new IndexChance(70000, 600)]; mob_13.exp=48; mob_13.hit=6; mob_13.hp=84; mob_13.id=13; mob_13.level=11; 
var mob_20 = new Monster(20);
mob_20.ac=15; mob_20.drop_table=[new IndexChance(100000, 40),new IndexChance(80100, 150),new IndexChance(400, 800)]; mob_20.exp=60; mob_20.hit=10; mob_20.hp=110; mob_20.id=20; mob_20.level=14; mob_20.undead=true; 
var mob_21 = new Monster(21);
mob_21.ac=19; mob_21.damage=2; mob_21.dr=1; mob_21.drop_table=[new IndexChance(40300, 1),new IndexChance(1000000, 290),new IndexChance(30100, 350),new IndexChance(90100, 460),new IndexChance(20300, 800)]; mob_21.exp=110; mob_21.hit=13; mob_21.hp=130; mob_21.id=21; mob_21.level=17; mob_21.undead=true; 
var mob_22 = new Monster(22);
mob_22.ac=12; mob_22.drop_table=[new IndexChance(60000, 600),new IndexChance(80000, 600)]; mob_22.exp=58; mob_22.hit=6; mob_22.hp=90; mob_22.id=22; mob_22.level=13; mob_22.undead=true; 

const mobs = new Map<u64, Monster>()
mobs.set(1, mob_1)
mobs.set(2, mob_2)
mobs.set(3, mob_3)
mobs.set(4, mob_4)
mobs.set(5, mob_5)
mobs.set(10, mob_10)
mobs.set(11, mob_11)
mobs.set(12, mob_12)
mobs.set(13, mob_13)
mobs.set(20, mob_20)
mobs.set(21, mob_21)
mobs.set(22, mob_22)

export function get_monster(index: u64): Monster {
    let mob = mobs.get(index);
    if (mob != null) {
        return mob.clone(mob);
    } else {
        assert(false, "Undefined mob")
        return new Monster(1);
    }
}