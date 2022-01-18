import React, { useRef, useState, useLayoutEffect } from "react";
import { globalState, setGlobalState } from "./state.js"
import { api_fight } from "./api";

export function GameOverlay() {
  const [count, setCount] = useState(0);
  const hp_cur = globalState.stat.hp_cur;
  const hp_max = globalState.stat.hp_max;
  const mp_cur = 1;
  const mp_max = 1;
  const diamond = globalState.resources.diamond;
  const gold = globalState.resources.gold;

  return (
    <div id="overlay">
      <section class="header">
        <div class="main-header">
          <div class="left-head">
            <div class="exp-bars">
              <div class="red-bar">
                <p>{hp_cur}/{hp_max}</p>
              </div>
              <div class="blue-bar">
                <p>{mp_cur}/{mp_max}</p>
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
          </div>

          <div class="right-head">
            <div>
              <img src="/assets/ui/money.png" alt=""/>
            </div>
            <div>
              <img src="/assets/ui/bag.png" alt=""/>
            </div>
            <div>
              <img class="book" src="/assets/ui/spell-book.png" alt=""/>
            </div>
            <div>
              <img class="parchment" src="/assets/ui/parchment.png" alt=""/>
            </div>
            <div>
              <img src="/assets/ui/menu.png" alt=""/>
            </div>
          </div>

        </div>
      </section>

    <section class="mid-right">
      <div class="objective">
        <div class="obj-container">
          <div>
            <div class="obj-title">
              <img src="/assets/ui/parchment.png" class="parchment" alt=""/>
              <p class="yellow-text">The Relic of the Temple</p>
              <img src="/assets/ui/loading.png" alt=""/>
            </div>
            <div class="obj-desc">
              <p>Collect the Weapons from specters in the Temple</p>
              <span>(5/15)</span>
            </div>
          </div>
          <div>
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
          </div>
        </div>
      </div>
      <div class="controls">
        <div class="col-3">
          <img class="radar" src="/assets/ui/radar.png" alt=""/>
          <img class="circle" src="/assets/ui/circle.png" alt=""/>
          <p class="circle-text">AUTO HUNT</p>
          <img class="hand" src="/assets/ui/hand.png" alt=""/>
        </div>
        <div class="move-control">
          <img class="hexa" src="/assets/ui/hexagram.png" onClick={e=> api_fight()} alt=""/>
        </div>
      </div>
    </section>

      <section class="footer">
        <div class="footer-div">
          <div class="left-footer">
            <div>
              <p>17</p>
              {/*<img class="wings" src="/assets/ui/wings.png" alt=""/>*/}
            </div>
            <div>
              <p class="footer-perc">24.5184%</p>
            </div>
          </div>
          <div class="right-footer">
           {/*<div class="footer-circle-bg">
             <img src="/assets/ui/potion.png" alt=""/>
             <p>1742</p>
           </div>*/}
           <div class="footer-circle-bg">
            <img src="/assets/ui/poison.png" alt=""/>
            <p>345</p>
          </div>
          {/*<div class="footer-square-bg-snow">
           <img class="snowflake" src="/assets/ui/snowflake.png" alt=""/>
          </div>*/}
          <div class="footer-square-bg">
          </div>
          <div class="footer-square-bg">
          </div>
          <div class="footer-square-bg">
          </div>
          <div class="footer-square-bg">
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}
