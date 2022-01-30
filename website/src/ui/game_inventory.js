import React, { useRef, useState, useLayoutEffect } from "react";
import { globalState, setGlobalState } from "../state.js"
import { get_item } from "./items"
import { nk_equip_item, nk_gacha_pull } from "../near.js"

export function GameInventory() {
  let inventory_open = globalState.ui.inventory_open
  
  return (
       <div class="inventory-bag" id="invModal" style={{ display: inventory_open ? "block" : "none" }}>
         <div className="inv-bag-rel">
            <div class="bag-top">
                <p>Bag</p>
                {/*<div>
                    <img src="/assets/ui/pin.png" alt="" />
                    <p>0</p>
                </div>*/}
                <img class="close-bag" onClick={() => setGlobalState({ui: {inventory_open: false}})} src="/assets/ui/close.png" alt="" />
            </div>
            <div class="bag-mid">
                <div class="bag-mid-left">
                    <div class="bag-border-right"></div>
                    <div>
                        <p>ALL</p>
                    </div>
                    <div>
                        <span>{globalState.auction.items.length} </span>
                        <span> / </span>
                        <span> 100</span>
                    </div>
                    <div><img src="/assets/ui/helmet.png" alt="" /></div>
                    <div><img src="/assets/ui/block.png" alt="" /></div>
                    <div><img src="/assets/ui/money.png" alt="" /></div>
                </div>
                <div class="bag-mid-right">
                    <div class="right-bag-body">
                        <div class="bag-body-row">
                            <GameInventoryGrid />
                        </div>
                    </div>
                </div>
            </div>
            <div class="bag-bottom">
                {/*<div><i class="fas fa-arrows-alt"></i></div>
                <div><i class="fas fa-trash-alt"></i></div>
                <div><i class="fas fa-search"></i></div>*/}
                <div><img src="/assets/ui/bag-menu.png" alt="" /></div>
                <div><i class="fas fa-arrows-alt-v orange-arr"></i></div>
            </div>
            <GameItemModel />
        </div>
    </div>
  );
}

var singleTimeout;
async function single_or_double(e, index) {
  if (e.detail == 1) {
    singleTimeout = setTimeout(()=> setGlobalState({ui: {inventory_item_model_index: index}}), 300)
  } else {
    clearTimeout(singleTimeout)
    singleTimeout = null;
    let item = get_item(index)
    if (item.slot) {
      await nk_equip_item(index, item.slot)
    } else if (item.type == "gatcha_poly") {
      await nk_gacha_pull(index)
    }
  }
}

export function GameInventoryGrid() {
  let equipped = globalState.auction.equipped.reduce((map,i)=> {map[i.index] = i.slot; return map;}, {})
  let inventory = globalState.auction.items.map(item=> {
    item["equipped"] = !!equipped[item.index]
    return item
  })

  var dom = []
  for (var i = 0; i < inventory.length; i += 4) {
    let bagItems = inventory.slice(i, i + 4).map(({index, equipped, count})=> {
      let item = get_item(index)
      return (
        <div id="bagItem" key={index}>
            <img id="eImg" src="/assets/ui/e.png" style={{display: equipped ? "unset" : "none"}} alt="" />
            <img class="myBtn" src={`/assets/items/${item ? item.texture : "Apple"}.png`} alt="" onClick={(e)=> single_or_double(e, index)} />
        </div>
    )})
    dom.push(
        <div class="bag-body-col" key={i}>
            {bagItems}
        </div>
    )
  }
  return dom
}

export function GameItemModel() {
  let inventory_item_model_index = globalState.ui.inventory_item_model_index
  let item = get_item(inventory_item_model_index)
  console.log(item)
  if (!item)
    return null
  
  let equipped = globalState.auction.equipped.reduce((map,i)=> {map[i.index] = i.slot; return map;}, {})
  let is_equipped = !!equipped[inventory_item_model_index]

  let stats = []
  if (item.weapon_dice) {
    stats.push(`${item.weapon_dice}d${item.weapon_dice_sides}`)
  }
  if (item.undead_dice) {
    stats.push(`Undead Dice ${item.undead_dice}d${item.undead_dice_sides}`)
  }
  if (item.damage) {
    stats.push(`Damage +${item.damage}`)
  }
  if (item.hit) {
    stats.push(`Hit +${item.hit}`)
  }
  if (item.mr) {
    stats.push(`Magic Resistance +${item.mr}`)
  }
  if (item.ac) {
    stats.push(`AC +${item.ac}`)
  }
  if (item.er) {
    stats.push(`Evasion +${item.er}`)
  }
  if (item.dr) {
    stats.push(`Damage Reduction +${item.dr}`)
  }
  if (item.attack_speed) {
    stats.push(`Attack Speed ${item.attack_speed > 0 ? "+" : ""}${item.attack_speed}`)
  }
  if (item.str) {
    stats.push(`Strength +${item.str}`)
  }
  if (item.dex) {
    stats.push(`Dexterity +${item.dex}`)
  }
  if (item.int) {
    stats.push(`Intelligence +${item.int}`)
  }
  if (item.hp_regen) {
    stats.push(`Health Regen +${item.hp_regen}`)
  }
  if (item.mp_regen) {
    stats.push(`Mana Regen +${item.mp_regen}`)
  }

  return (
  <div id="myModal" class="item-modal" style={{ display: inventory_item_model_index ? "block" : "none" }}>
    <div class="item-modal-content">
      <div class="top-item-modal-content">
        <div>
            <img src={`/assets/items/${item ? item.texture : "Apple"}.png`} alt="" />
            <img src="/assets/ui/e.png" style={{display: is_equipped ? "unset" : "none"}} className="item-modal-E" alt="" />
        </div>
        <div class="top-col-item-modal">
            <p>{item.name}</p>
            <div>
              {/*<img src="/assets/ui/briefcase.png" alt="" />
              <img src="/assets/ui/bag.png" alt="" />*/}
              <img src="/assets/ui/balance2.png" alt="" />
              <img src="/assets/ui/anvil.png" style={{display: item.slot ? "unset" : "none"}} alt="" />
            </div>
            <img src="/assets/ui/close.png" className="close-item-modal" onClick={() => setGlobalState({ui: {inventory_item_model_index: null}})} alt="" />
        </div>
      </div>
      <div class="mid-item-modal-content">
        <div class="mid-item-modal-top">
        <div>
          <p class="mid-modal-left-title">Stats</p>
        </div>
          {stats.map((stat, index)=> (
            <div class="mid-modal-two-row" key={index}>
                <img src="/assets/ui/spark.png" alt="" />
                <p>{stat}</p>
            </div>
          ))}

          <div class="mid-modal-two-row">
              <img src=" " alt="" style={{opacity:"0"}} />
              <p></p>
          </div>
          {/*<div class="mid-modal-two-row">
              <img src="/assets/ui/chess.png" alt="" />
              <p>Wood</p>
          </div>
          <div class="mid-modal-two-row">
              <img src="/assets/ui/bag.png" alt="" />
              <p>225</p>
          </div>
          <div class="mid-modal-two-row">
              <img src="" alt="" style={{opacity:"0"}} />
              <p>1</p>
          </div>*/}
        </div>
          {/*<div className="mid-item-modal-bottom">
            <div className="mid-item-modal-sale">
              <p className="mid-modal-left-title">Sale Price</p>
              <img src="/assets/ui/coin.png" alt="" />
              <p>90</p>
            </div>
            <hr className="item-modal-sale" />
          </div>
          <div className="mid-item-modal-img">
            <img src="/assets/ui/balance2.png" alt="" />
            <img src="/assets/ui/book.png" alt="" />
            <img src="/assets/ui/AB.png" alt="" />
            <img src="/assets/ui/e-orange.png" alt="" />
          </div>*/}
      </div>

      <div class="bottom-item-modal-content">
          <img src="/assets/ui/anvil.png" alt="" />
          <img src="/assets/ui/pills-bottle.png" alt="" />
          <img src="/assets/ui/hammer.png" alt="" />
          <img src="/assets/ui/trash-can.png" alt="" />
      </div>
    </div>
  </div>
  )
}