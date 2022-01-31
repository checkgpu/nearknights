import React, { useRef, useState, useLayoutEffect } from "react";
import { globalState, setGlobalState } from "../state.js"
import { api_fight, level_table, level_table_perc, shop_buy_gold } from "../api";
import { move_knight } from "../App";
import { GameInventory } from "./game_inventory";
import { AuctionHouse } from "./game_auction_house";

export function GameOverlay() {
  const hp_cur = globalState.hero.hp_cur;
  const hp_max = globalState.hero.hp_max;
  const hp_perc = (hp_cur / hp_max) * 100
  const mp_cur = globalState.hero.mp_cur;
  const mp_max = globalState.hero.mp_max;
  const mp_perc = (mp_cur / mp_max) * 100
  const diamond = window.nearApi.utils.format.formatNearAmount(`${globalState.balance||0}`, 2)

  const gold = globalState.hero.gold;
  const exp = globalState.hero.exp;
  const red_potion = globalState.hero.red_potion;
  const autohunt = globalState.autohunt

  const ac = globalState.hero.ac;
  const mr = globalState.hero.mr;
  const damage = globalState.hero.damage;

  const exp_perc = level_table_perc(globalState.hero.exp) || 0;
  const level = level_table(globalState.hero.exp) || 1;

  if (globalState.ui.auction_open) {
    return (<AuctionHouse />)
  }

  return (
    <div id="overlay">
      <section class="ingame-header">
        <div class="main-ingame-header">
          <div class="ingame-left-head">
            <div class="exp-bars">
              <div class="red-bar-con">
                <div class="red-bar" style={{width: `${hp_perc}%`}}>
                  <p><span id="redHpCount">{hp_cur}</span>/{hp_max}</p>
                </div>
              </div>
              <div class="blue-bar-con">
                <div class="blue-bar" style={{width: `${mp_perc}%`}}>
                  <p><span id="blueHpCount">{mp_cur}</span>/{mp_max}</p>
                </div>
              </div>
              <div class="powers">
                <div>
                  <img class="shield1" src="/assets/ui/shield1.png" alt=""/>
                  <p>{damage}</p>
                </div>
                <div>
                  <img src="/assets/ui/shield2.png" alt=""/>
                  <p>{ac}</p>
                </div>
                <div>
                  <img src="/assets/ui/star.png" alt=""/>
                  <p>{mr}</p>
                </div>
              </div>
            </div>
            <div class="skills" style={{visibility: "hidden"}}>
              <div class="green-skills">
                <div>
                  <img src="/assets/ui/active2.png" alt=""/>
                </div>
                <div>
                  <img src="/assets/ui/active3.png" alt=""/>
                </div>
                <div>
                  <img src="/assets/ui/active4.png" alt=""/>
                </div>
                <div>
                  <img src="/assets/ui/active10.png" alt=""/>
                </div>
                
              </div>
              <div class="blue-skills">
                <div>
                  <img src="/assets/ui/passive1.png" alt=""/>
                </div>
              </div>
            </div>
          </div>
          <div class="mid-head">
            <div>
              <img class="diamond-icon" src="/assets/ui/near_icon_wht.png" alt=""/>
            </div>
            <div>
              <p>{diamond}</p>
            </div>
            <div>
              <img src="/assets/ui/coin.png" alt=""/>
            </div>
            <div>
              <p>{gold}</p>
            </div>
            <div><img src="/assets/ui/close.png" class="head-plus" onClick={e=> shop_buy_gold(1)} alt="" /></div>
          </div>

          <div class="ingame-right-head">
            <div>
              <img src="/assets/ui/money.png" alt=""/>
            </div>
            <div>
              <img src="/assets/ui/bag.png" onClick={() => setGlobalState({ui: {inventory_open: !globalState.ui.inventory_open}})} alt=""/>
            </div>
            <div>
              <img class="book" src="/assets/ui/spell-book.png" alt=""/>
            </div>
            {/*<div>
              <img class="parchment" src="/assets/ui/parchment.png" alt=""/>
            </div>*/}
            <div>
              <img src="/assets/ui/balance2.png" onClick={() => setGlobalState({ui: {auction_open: true}})} alt=""/>
            </div>
            {/*<div>
              <img src="/assets/ui/menu.png" alt=""/>
            </div>*/}
          </div>

        </div>
      </section>
      <GameInventory />
      
      <section class="mid-right" style={{display: globalState.scene == "mainmenu" ? "none" : "flex"}}>
        <div class="objective">
          <div class="obj-container">
            <div>
              <div class="obj-title">
                <img src="/assets/ui/parchment.png" class="parchment" alt=""/>
                <p class="yellow-text">Goblin Extermination</p>
                <img src="/assets/ui/loading.png" onClick={e=> move_knight(1, window.setKnightPoint, true)} alt=""/>
              </div>
              <div class="obj-desc">
                <p>Slay goblins to prove your expertise with a weapon</p>
                <span>(0/6)</span>
              </div>
            </div>
            {/*<div>
              <div class="obj-title">
                <img src="/assets/ui/flag.png" alt=""/>
                <p class="green-text">NPC List: the Village Navigator</p>
              </div>
              <div class="obj-desc">
                <p>Check NPC List in Town or Village</p>
              </div>
            </div>
            <div>
              <div class="obj-title">
                <img src="/assets/ui/flag.png" alt=""/>
                <p class="green-text">Skillbook: Learn New Skills</p>
                <img src="/assets/ui/loading.png" alt=""/>
              </div>
              <div class="obj-desc">
                <p>Talk to the Skillbook Merchant in Gludin Village</p>

              </div>
            </div>
            <div>
              <div class="obj-title">
                <img src="/assets/ui/flag.png" alt=""/>
                <p class="green-text">Oracle: The Voice of Einhasad</p>
                <img src="/assets/ui/loading.png" alt=""/>
              </div>
              <div class="obj-desc">
                <p>Collect the Weapons from specters in the Temple</p>
              </div>
            </div>*/}
          </div>
        </div>
        <div class="controls">
          <div class="col-3">
            {/*<img class="radar" src="/assets/ui/radar.png" alt=""/>*/}
            <img class="circle" src="/assets/ui/circle.png" style={!autohunt ? {background: "transparent"} : {}} onClick={e=> setGlobalState({autohunt: !autohunt})} alt=""/>
            <p class="circle-text" style={{cursor: "default"}} onClick={e=> setGlobalState({autohunt: !autohunt})}>AUTO HUNT</p>
            {/*<img class="hand" src="/assets/ui/hand.png" alt=""/>*/}
          </div>
          <div class="move-control">
            <img class="hexa" src="/assets/ui/hexagram.png" onClick={e=> api_fight()} alt=""/>
          </div>
        </div>
      </section>

      <section class="ingame-footer">
        <div class="ingame-footer-div">
          <div class="left-ingame-footer">
            <div>
              <p>{level}</p>
              {/*<img class="wings" src="/assets/ui/wings.png" alt=""/>*/}
            </div>
            <div>
              <p class="ingame-footer-perc">{parseFloat(exp_perc).toFixed(4)}%</p>
            </div>
          </div>
          <div class="right-ingame-footer">
           {/*<div class="ingame-footer-circle-bg">
             <img src="/assets/ui/potion.png" alt=""/>
             <p>1742</p>
           </div>*/}
           <div class="ingame-footer-circle-bg">
            <img src="/assets/ui/poison.png" alt=""/>
            <p>{red_potion}</p>
          </div>
          {/*<div class="ingame-footer-square-bg-snow">
           <img class="snowflake" src="/assets/ui/snowflake.png" alt=""/>
          </div>*/}
          <div class="ingame-footer-square-bg">
          </div>
          <div class="ingame-footer-square-bg">
          </div>
          <div class="ingame-footer-square-bg">
          </div>
          <div class="ingame-footer-square-bg">
          </div>
          </div>
        </div>
        <div class="ingame-footer-xp-con">
          <div class="ingame-footer-xp-bar" id="ingame-footerXpBar" style={{width: `${exp_perc}%`}}></div>
        </div>
      </section>
    </div>
  );
}
