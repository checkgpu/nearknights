import React, { useRef, useState, useLayoutEffect } from "react";
import { globalState, setGlobalState } from "../state.js"
import { near_login, nk_create_knight } from "../near";

export function skip_intro() {
  setGlobalState({scene: "ingame"})
}

export async function create_knight() {
  await nk_create_knight()
  window.location = "/"
}

export function MainMenu() {


  let button = (
       <div style={{width: "100%", marginInline:"10px"}}>
        <button className="near-button" onClick={()=> skip_intro()}>Skip Intro</button>
      </div>
  )
  if (!globalState.accountId) {
    button = (
      <div style={{width: "100%", marginInline:"10px"}}>
        <button className="near-button" onClick={()=> near_login()}>Login with NEAR</button>
      </div>
    )
  }
  if (!!globalState.accountId && (globalState.hero.account == "" || !globalState.hero.account)) {
    button = (
      <div style={{width: "100%", marginInline:"10px"}}>
        <button className="near-button" onClick={()=> create_knight()}>Create Your Knight</button>
      </div>
    )
  }

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
            {button}
          </div>
        </div>
        <div class="ingame-footer-xp-con" style={{visibility: "hidden"}}>
          <div class="ingame-footer-xp-bar" id="ingame-footerXpBar" style={{width: `${0}%`}}></div>
        </div>
      </section>
    </div>
  );
}
