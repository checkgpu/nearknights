import React, { useRef, useState, useLayoutEffect } from "react";
import { globalState, setGlobalState } from "../state.js"
import { api_fight, level_table, level_table_perc, buy_gold } from "../api";
import { move_knight } from "../App";

export function GameOverlay() {
  const [count, setCount] = useState(0);
  const hp_cur = globalState.hero.hp_cur;
  const hp_max = globalState.hero.hp_max;
  const hp_perc = (hp_cur / hp_max) * 100
  const mp_cur = globalState.hero.mp_cur;
  const mp_max = globalState.hero.mp_max;
  const mp_perc = (mp_cur / mp_max) * 100
  const diamond = Number(window.nearApi.utils.format.formatNearAmount(`${globalState.balance||0}`)).toFixed(2)
  const gold = globalState.hero.gold;
  const exp = globalState.hero.exp;
  const red_potion = globalState.hero.red_potion;
  const autohunt = globalState.autohunt

  const ac = globalState.hero.ac;
  const damage = globalState.hero.damage;

  const exp_perc = level_table_perc(globalState.hero.exp);
  const level = level_table(globalState.hero.exp);

  //inventory modal
  // onClick={() => setShowInven((s) => !s)}
  const [showInven, setShowInven] = useState(true);
  // item modal
  const [showItemModal, setItemModal] = useState(true);

  return (
    <div id="overlay">
      <section class="header">
        <div class="main-header">
          <div class="left-head">
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
                  <p>1</p>
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
            <div> <img src="/assets/ui/close.png" class="head-plus" onClick={e=> buy_gold(1)} alt=""/> </div>
          </div>

          <div class="right-head">
            <div>
              <img src="/assets/ui/money.png" alt=""/>
            </div>
            <div>
              <img src="/assets/ui/bag.png" onClick={() => setShowInven((s) => !s)} alt=""/>
            </div>
            <div>
              <img class="book" src="/assets/ui/spell-book.png" alt=""/>
            </div>
            {/*<div>
              <img class="parchment" src="/assets/ui/parchment.png" alt=""/>
            </div>*/}
            <div>
              <img src="/assets/ui/balance2.png" alt=""/>
            </div>
            {/*<div>
              <img src="/assets/ui/menu.png" alt=""/>
            </div>*/}
          </div>

        </div>
      </section>
       {/* inventory modal */}
       <div class="inventory-bag" id="invModal" style={{ display: showInven ? "block" : "none" }}>
         <div className="inv-bag-rel">
            <div class="bag-top">
                <p>Bag</p>
                <div>
                    <img src="/assets/ui/pin.png" alt="" />
                    <p>0</p>
                </div>
                <img class="close-bag" onClick={() => setShowInven((s) => !s)} src="/assets/ui/close.png" alt="" />
            </div>
            <div class="bag-mid">
                <div class="bag-mid-left">
                    <div class="bag-border-right"></div>
                    <div>
                        <p>ALL</p>
                    </div>
                    <div>
                        <span>27 </span>
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
                            <div class="bag-body-col">
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt=""  onClick={() => setItemModal((s) => !s)} />
                                </div>
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" onClick={() => setItemModal((s) => !s)} />
                                </div>
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                            </div>
                            <div class="bag-body-col">
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                            </div>
                            <div class="bag-body-col">
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                            </div>
                            <div class="bag-body-col">
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                            </div>
                            <div class="bag-body-col">
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                                <div id="bagItem">
                                    <img id="eImg" src="/assets/ui/e.png" alt="" />
                                    <img class="myBtn" src="/assets/ui/active2.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bag-bottom">
                <div><i class="fas fa-arrows-alt"></i></div>
                <div><i class="fas fa-trash-alt"></i></div>
                <div><i class="fas fa-search"></i></div>
                <div><img src="/assets/ui/bag-menu.png" alt="" /></div>
                <div><i class="fas fa-arrows-alt-v orange-arr"></i></div>
            </div>
            {/* item model */}
              <div id="myModal" class="item-modal" style={{ display: showItemModal ? "block" : "none" }}>
                <div class="item-modal-content">
                  <div class="top-item-modal-content">
                    <div>
                        <img src="/assets/ui/passive1.png" alt="" />
                        <img src="/assets/ui/e.png" className="item-modal-E" alt="" />
                    </div>
                    <div class="top-col-item-modal">
                        <p>Wooden Breastplate (Bound)</p>
                        <div>
                          <img src="/assets/ui/briefcase.png" alt="" />
                          <img src="/assets/ui/bag.png" alt="" />
                          <img src="/assets/ui/balance2.png" alt="" />
                          <img src="/assets/ui/anvil.png" alt="" />
                        </div>
                        <img src="/assets/ui/close.png" className="close-item-modal" onClick={() => setItemModal((s) => !s)} alt="" />
                    </div>
                  </div>
                  <div class="mid-item-modal-content">
                    <div class="mid-item-modal-top">
                    <div>
                      <p class="mid-modal-left-title">Top</p>
                    </div>
                      <div class="mid-modal-two-row">
                          <img src="/assets/ui/spark.png" alt="" />
                          <p>Defense + 2</p>
                      </div>
                      <div class="mid-modal-two-row">
                          <img src=" " alt="" style={{opacity:"0"}} />
                          <p></p>
                      </div>
                      <div class="mid-modal-two-row">
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
                      </div>
                    </div>
                      <div className="mid-item-modal-bottom">
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
                      </div>
                  </div>

                  <div class="bottom-item-modal-content">
                      <img src="/assets/ui/anvil.png" alt="" />
                      <img src="/assets/ui/pills-bottle.png" alt="" />
                      <img src="/assets/ui/hammer.png" alt="" />
                      <img src="/assets/ui/trash-can.png" alt="" />
                      
                  </div>
                </div>
              </div> 
             </div>
       </div>
      
      
     
      
     
    <section class="mid-right">
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
          <img class="radar" src="/assets/ui/radar.png" alt=""/>
          <img class="circle" src="/assets/ui/circle.png" style={!autohunt ? {background: "transparent"} : {}} onClick={e=> setGlobalState({autohunt: !autohunt})} alt=""/>
          <p class="circle-text" style={{cursor: "default"}} onClick={e=> setGlobalState({autohunt: !autohunt})}>AUTO HUNT</p>
          <img class="hand" src="/assets/ui/hand.png" alt=""/>
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
