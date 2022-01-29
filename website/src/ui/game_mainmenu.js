import React, { useRef, useState, useLayoutEffect } from "react";
import { globalState, setGlobalState } from "../state.js"
import { api_fight, level_table, level_table_perc, shop_buy_gold } from "../api";
import { near_login } from "../near";

export function skip_intro() {
  setGlobalState({scene: "ingame"})
}

export function MainMenu() {
  return (
    <div id="overlay">
      <section class="ingame-footer" style={{bottom: "10%"}}>
        <div class="ingame-footer-div">
          <div class="left-ingame-footer" style={{visibility: "hidden"}}>
            <div>
              <p>{0}</p>
              {/*<img class="wings" src="/assets/ui/wings.png" alt=""/>*/}
            </div>
            <div>
              <p class="ingame-footer-perc">{parseFloat(0).toFixed(4)}%</p>
            </div>
          </div>
          <div class="right-ingame-footer">
          {globalState.accountId ?
            <div class="ingame-footer-square-bg" style={{width: "100%"}}>
              <button style={{padding: "6px"}} onClick={()=> skip_intro()}>Skip Intro</button>
            </div>
            : 
            <div class="ingame-footer-square-bg" style={{width: "100%"}}>
              <button style={{padding: "6px"}} onClick={()=> near_login()}>Login with NEAR</button>
            </div>
           }
          </div>
        </div>
        <div class="ingame-footer-xp-con" style={{visibility: "hidden"}}>
          <div class="ingame-footer-xp-bar" id="ingame-footerXpBar" style={{width: `${0}%`}}></div>
        </div>
      </section>
    </div>
  );
}
