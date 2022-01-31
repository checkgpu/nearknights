# NEAR Knights

A NEAR Progressive Battler RPG with NFTs.  
  
https://nearknights.com/

## How to play
NEAR Knights is an idle battler. Move your character to fields
and press the dice to battle. When your HP drops low you heal with
potions. Once you run out of potions and lose all HP you die.  
  
After death you resurrect at level 1 starting all over again, you
also automatically spend 38 gold per potion to stock up again. Your
potions are limited by your carryweight which you can raise by leveling up
or putting stats into con.  
  
You carry over into your next life all items you have found, bonus
stat points you have placed, some unique level up bonuses, and your 
carryweight. These carry over bonuses are primary based off the max 
level you have achieved in any of your previous lives.
  
## Non-UX visible calls
Once the UX is fully finalized these buttons will appear but for now
you should call these functions manually.

```javascript
// Add/Preview stats (every 3 max levels you get 1 permanent stat point)
str = 0; dex = 1; int = 2; wis = 3; con = 4;

//Prints to console the diff in stats after adding
await window.nk_stat_preview(0)

//Adds the stat
await window.nk_stat_add(0)

//Reset stats (costs 1 NEAR)
await window.nk_stat_reset()
```

```javascript
//Gacha polymorphs add attackspeed and stats
//Hero with Dagger equipped   attack_speed: 840
//Hero with dagger + uncommon gacha   attack_speed: 730
// View gachas
await window.nk_gachas()

//Equip new gacha polymorph
await window.nk_equip_polymorph(index)
```

```javascript
// Secret daily limit shop
const SHOP = {
    1: {name: "Enchant Gear Rune", item_id: 1_000_000, limit: 3, reset_time: 23*60*60, cost: 3_000, currency: "gold"},
    10: {name: "Hero Gacha", item_id: 6_000_000, limit: 2, reset_time: 23*60*60, cost: 3_000, currency: "gold"},
    1001: {name: "Hero Gacha Premium", item_id: 6_000_100, limit: 99999, reset_time: 23*60*60, cost: 1, currency: "near"},
    1002: {name: "Hero Gacha Epic x11", item_id: 6_000_200, limit: 10, reset_time: 23*60*60, cost: 10, currency: "near"},
}
await window.nk_shop_buy(1)
```

## Contracts
Contains the NFT (MultiFungible) marketplace built on NEAR  
Contains the NEAR Knights battle contracts  

## Website
Contains the frontend UX + JS NFT marketplace code  
Contains the NEARKnights UX + JS code  

## Game
The game integrates PhaserJS for the Game code (sprites/physics) 
and ReactJS for the UX and interfaces. We found it to be a very
productive combination.

## Contributors
UX / UI - https://github.com/kasim393  
Integration - https://github.com/vans163  
