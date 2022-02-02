/* global BigInt */
import React, { useRef, useState, useLayoutEffect } from "react";
import { shop_buy_gold } from "../api";
import { nft_market_buy, nft_market_sell, nft_market_cancel, near_refresh_ah } from "../near";
import { get_item, get_item_stats } from "./items";
import { globalState, setGlobalState } from "../state.js"

export  function AuctionHouse() {
  const [showTab, setShowTab] = useState(true);
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [counter, setCounter] = useState(1);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  const [sellItem, setSellItem] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const hp_cur = globalState.hero.hp_cur;
  const hp_max = globalState.hero.hp_max;
  const hp_perc = (hp_cur / hp_max) * 100
  const mp_cur = globalState.hero.mp_cur;
  const mp_max = globalState.hero.mp_max;
  const mp_perc = (mp_cur / mp_max) * 100
  const diamond = window.nearApi.utils.format.formatNearAmount(`${globalState.balance||0}`, 2)

  const gold = globalState.hero.gold;

  var total_price = globalState.auction.active.reduce((acc,e)=> acc + BigInt(e.price), BigInt(0))
  total_price = window.nearApi.utils.format.formatNearAmount(total_price.toString(), 2)
  return (
    <div id="overlay">
    {/* top header */}
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
            {/*<div class="skills">
              <div class="green-skills">
                <div>
                  <img src="assets/ui/active2.png" alt="" />
                </div>
                <div>
                  <img src="assets/ui/active3.png" alt="" />
                </div>
                <div>
                  <img src="assets/ui/active4.png" alt="" />
                </div>
                <div>
                  <img src="assets/ui/active10.png" alt="" />
                </div>
                
              </div>
              <div class="blue-skills">
                <div>
                  <img src="assets/ui/passive1.png" alt="" />
                </div>
              </div>
            </div>*/}
          </div>
          <div class="mid-head">
            <div>
              <img class="diamond-icon" src="assets/ui/near_icon_wht.png" alt="" />
            </div>
            <div>
              <p>{diamond}</p>
            </div>
            <div>
              <img src="assets/ui/coin.png" alt="" />
            </div>
            <div>
              <p>{gold}</p>
            </div>
            <div>
              <img src="assets/ui/close.png" class="head-plus" onClick={e=> shop_buy_gold(1)} alt="" />
            </div>
          </div>
          <div class="right-head">
            <div>
              <i class="fas fa-globe-americas"></i>
            </div>
            <div>
              <p class="head-market">World Market</p>
            </div>
              <span class="head-divider"> | </span>
              <div>
                <img src="assets/ui/balance.png" alt="" />
              </div>
              <div>
                <p>Server Market</p>
              </div>
              <div>
                <img src="assets/ui/exit.png" onClick={e=> setGlobalState({ui: {auction_open: false}})} alt="" />
              </div>
          </div>
        </div>
     </section>

    {/* navbar */}
    <section class="top-navbar">
        <div class="navbar">
          <div id="navbarMenu" class="nav-left">
            <div  className={showTab ? "navbar-item navbar-active" : "navbar-item"} onClick={() => setShowTab((s) => !s)}>
              <p>Search</p>
            </div>
            <div className={ showTab ? "navbar-item" : "navbar-item navbar-active"} onClick={() => setShowTab((s) => !s)}>
              <p>Sell</p>
            </div>
            {/*<div class="navbar-item"><p>History</p></div>*/}
          </div>
          <div class="nav-right">
            <div><b>Current Fee Rate 5%</b><span style={{display: "none"}}> (Castle Tax Rate 5% + Basic Tax Rate 3%)</span></div>
          </div>
        </div>
    </section>
    {/* <!-- -------------  Search tab start ------------------- --> */}
    <section class="search-tab" id="Search" style={{ display: showTab ? "block" : "none" }} >
        <section class="sidebar">
          <div id="sidebarMenu" class="main-sidebar">
            <div class="sidebar-item sidebar-active"><p>All</p></div>
            {/*<div class="sidebar-item"><p>Main</p></div>
            <div class="sidebar-item sidebar-active">v
              <p>Weapon</p> 
              <span>Sword</span>
            </div>*/}
            <div class="sidebar-item"><p>Weapon</p></div>
            <div class="sidebar-item"><p>Armor</p></div>
            <div class="sidebar-item"><p>Accessory</p></div>
            <div class="sidebar-item"><p>Skillbook</p></div>
            <div class="sidebar-item"><p>Consumable</p></div>
            <div class="sidebar-item"><p>Other</p></div>
          </div>
        </section>

        <section class="filter">
          <div class="main-filter">
            <div class="select-div">
              <select>
                <option >Filter</option>
                <option value="">All</option>
                <option value="">Sword</option>
                <option value="">Greatsword</option>
                <option value="">Chainblade</option>
                <option value="">Dual Blades</option>
                <option value="">Spear</option>
                <option value="">Dagger</option>
                <option value="">Bow</option>
              </select>
            </div>
            <div>
              <input type="text" placeholder="Enter search term."/>
            </div>
            <div class="refresh-div">
              <button class="refresh-btn"><i class="fas fa-redo-alt"></i></button>
            </div>
          </div>
        </section>

        <section class="item-container">
          <div class="items">
            <table class="customTable">
              <thead>
                <tr>
                  <th colSpan={2}>Icon</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <AuctionListed />
              </tbody>
            </table>
          </div>
          <div class="footer">
            <div>
              <button onClick={e=> near_refresh_ah()}>Refresh</button>
            </div>
          </div>
        </section>
    </section>
    {/* <!-- -------------  Search tab End ------------------- --> */}

    {/* <!-- -------------  Sell tab start ------------------- --> */}
    <section class="sell-tab" id="Sell" style={{ display: !showTab ? "block" : "none" }} >
      <div class="sell-container">
      <div class="left-sell">
        {sellItem ? (
          <>
            <div class="left-sell-header">
              <ul >
                <li>Item</li>
                <li>Reforge Options(s)</li>
                <li>Price</li>
                <li>Status</li>
              </ul>
            </div>
            <div class="left-sell-body">  
                <img src="assets/ui/balance.png" alt="" />
                <p>No items are on sale. Select an item to sell from your Bag.</p>

            </div>
          </>
          ):(
            <>
              <div class="items">
                <table class="customTable">
                  <thead>
                    <tr>
                      <th colspan="2">Item</th>
                      <th>Reforge Option(s)</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="td-fav"> <img src="assets/items/Sword_03.png" alt="" /></td>
                      <td>
                        <p class="td-title">Elven Bow</p>
                        <span class="td-detail">Weapon Damage +17 / Accuracy +4 / Extra Damage +2</span>
                      </td>
                      <td>-</td>
                      <td class="table-price">
                        <div>
                        <img src="assets/ui/near_icon_wht.png" alt="" /> 
                        <p>22</p>
                        </div>
                        <div><span>0.4 per unit</span></div>
                      </td>
                      <td class="merch-list">
                        <p>Unsold</p>
                        <button onClick={() => setShowCancel((s) => !s)}>Cancel Sale</button>
                      </td>
                    </tr>
                    <tr>
                      <td class="td-fav"> <img src="assets/items/Enchantment_47_rune_stoune.png" alt="" /></td>
                      <td>
                        <p class="td-title">Steel</p>
                        <span class="td-detail"></span>
                      </td>
                      <td className="reforge">-</td>
                      <td class="table-price">
                        <div>
                        <img src="assets/ui/near_icon_wht.png" alt="" /> 
                        <p>22</p>
                        </div>
                        <div>
                         <span>0.4 per unit</span>
                        </div>
                      </td>
                      <td class="merch-list">
                        <p>Unsold</p>
                        <button onClick={() => setShowCancel((s) => !s)}>Cancel Sale</button>
                       </td>
                    </tr>
                
                  </tbody>
                </table>
              </div>
              {/* <!-- cancel Modal --> */}
              <div id="cancelModal" class="cancel-modal" style={{ display: showCancel ? "block" : "none" }}>
                  {/* <!-- Modal content --> */}
                  <div class="modal-content">
                    <div class="top-modal-content">
                      <div>
                        <p>Cancel Sale</p>
                      </div>
                     
                    </div>
                    <div class="mid-modal-content">
                     <div>
                       <img src="assets/items/Sword_03.png" alt="" />
                       <p>Elven Bow</p>
                       <p>Cancel the sale?</p>
                     </div>
                    </div>
                    <div class="bottom-modal-bottom">
                      <div>
                      <p>The registration fee will not be refunded</p>
                      </div>
                      <div>
                      <button class="close" onClick={() => setShowCancel((s) => !s)}>Cancel</button>
                      <button>Confirm</button>
                      </div>
                    </div>
                  </div>
              </div>
            </>
          )}
        </div>
        <div class="right-sell">
          <div id="sellRightMenu" class="right-sell-head">
            <div class="sell-right-item right-sell-active"><p>ALL</p></div>
            <div class="sell-right-item"><img src="assets/ui/helmet.png" alt="" /></div>
            <div class="sell-right-item"><img src="assets/ui/block.png" alt="" /></div>
            <div class="sell-right-item"><img src="assets/ui/money-bag.png" alt="" /></div>
          </div>
          <div class="right-sell-body">
            <div class="sell-body-row">
              <InventoryGrid />
            </div>
          </div>
        </div>
      </div>
      
      <SellItemModal />

      <div class="footer">  
          <div>
            <p>Sell</p>
            <span>{globalState.auction.active.length}/30</span>
          </div>
          <div>
            <p>Total Price</p>
            <img src="assets/ui/near_icon_wht.png" alt="" /> 
            <span>{total_price}</span>
          </div>
      
      </div>
    </section>

    {/* <!-- -------------  Sell tab End ------------------- --> */}  

    </div>
  );
}

function SellItemModal() {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  let f_setPrice = function(price) {
    if (price <= 0.02)
      price = 0.02
    setPrice(price)
  }

  const auction_item_model_index = globalState.ui.auction_item_model_index
  if (!auction_item_model_index)
    return null;
  const item = get_item(auction_item_model_index)
  let stats = get_item_stats(auction_item_model_index)

  return (
  <div id="myModal" class="modal" style={{ display: auction_item_model_index ? "block" : "none" }}>
      {/* <!-- Modal content --> */}
      <div class="modal-content">
        {/* <!-- <span class="close">&times;</span> --> */}
        <div class="top-modal-content">
          <div>
            <img src={`/assets/items/${item ? item.texture : "Apple"}.png`} alt="" />
          </div>
          <div class="top-col-modal">
            <p>{item.name}</p>
            {/*<b>Current Tax Rate 8%</b><span> (Castle Tax Rate 5% + Basic Tax Rate 3%)</span>*/}
          </div>
        </div>
        <div class="mid-modal-content">
          <div class="mid-modal-left">
            <p class="mid-modal-left-title">Stats</p>
            {stats.map((stat, index)=> (
              <div class="mid-modal-two-row" key={index}>
                  <img src="/assets/ui/spark.png" alt="" />
                  <p>{stat}</p>
              </div>
            ))}
            {/*<div class="mid-modal-two-row">
              <img src="assets/ui/chess.png" alt="" />
              <p>Jewelry</p>
            </div>
            <div class="mid-modal-two-row">
              <img src="assets/ui/bag.png" alt="" />
              <p>50</p>
            </div>
            <div class="mid-modal-two-row">
              <img src="" alt="" style={{opacity:"0"}} />
              <p>1</p>
            </div>*/}
          </div>
          {/*<div class="mid-modal-right">
            <p class="mid-modal-left-title">
              Market Price <span><i class="far fa-clock"></i> Last 28 days</span>
            </p>
            <div class="mid-modal-two-row right-mid-modal">
              <p>Minimum Trade Price</p>
              <img src="assets/ui/near_icon_wht.png" alt="" />
              <span>0</span>
            </div>
            <div class="mid-modal-two-row right-mid-modal">
              <p>Maximum Trade Price</p>
              <img src="assets/ui/near_icon_wht.png" alt="" />
              <span>0</span>
            </div>
            <div class="mid-modal-two-row right-mid-modal">
              <p>Average Trade Price</p>
              <img src="assets/ui/near_icon_wht.png" alt="" />
              <span>0</span>
            </div>
            <div class="mid-modal-two-row right-mid-modal">
              <p>Last Trade Price</p>
              <img src="assets/ui/near_icon_wht.png" alt="" />
              <span>0</span>
            </div>
            <div class="mid-modal-two-row right-mid-modal">
              <p>Minimum Trade Price</p>
              <img src="assets/ui/near_icon_wht.png" alt="" />
              <span>0</span>
            </div>
          </div>*/}
        </div>
        <div class="bottom-modal-content">
          <div class="bottom-modal-left">
            <div>
              <p>Quantity</p>
              <input type="number" value={quantity} disabled={true} />
            </div>
            <div class="total-price-div">
              <p>Price Per Unit</p>
              <input class="total-input" type="number" value={price} onChange={(e) => f_setPrice(Number(e.target.value))}/>
              <img src="assets/ui/near_icon_wht.png" alt="" />
            </div>
            <hr class="hr-style" />
            <div >
              <p>Total Price</p>
              <div>
                <span>{quantity * price}</span>
                <img src="assets/ui/near_icon_wht.png" alt="" />
              </div>
            </div>
          </div>
          {/*<div class="bottom-modal-right">
            <div class="cal-input">
              <button id="cal-minus" onClick={()=> decrementCounter()}><i class="fas fa-minus"></i></button>
              <input id="cal-display" type="number" value={counter} onChange={(e) => setCounter(e.target.value)} />
              <button id="cal-plus" onClick={()=> incrementCounter()}><i class="fas fa-plus"></i></button>
            </div>
            <div>
              <table >
                <tbody>
                <tr>
                <td><button class="cal-btn">7</button></td>
                <td><button class="cal-btn">8</button></td>
                <td><button class="cal-btn">9</button></td>
                <td><button class="cal-btn">←</button></td>
                </tr>
                <tr>
                <td><button class="cal-btn">4</button></td>
                <td><button class="cal-btn">5</button></td>
                <td><button class="cal-btn">6</button></td>
                <td><button class="cal-btn">MAX</button></td>
                </tr>
                <tr>
                <td><button class="cal-btn">1</button></td>
                <td><button class="cal-btn">2</button></td>
                <td><button class="cal-btn">3</button></td>
                <td><button class="cal-btn">0</button></td>
                </tr>
                </tbody>
                </table>
            </div>
          </div>*/}
        </div>
        <div class="bottom-modal-bottom">
          <button class="close" onClick={()=> setGlobalState({ui: {auction_item_model_index: null}})}>Cancel</button>
          <button onClick={()=> nft_market_sell(auction_item_model_index, window.nearApi.utils.format.parseNearAmount(price.toString()), quantity)}>Confirm</button>
        </div>
      </div>
  </div>
  )
}

function InventoryGrid() {
  let equipped = globalState.auction.equipped.reduce((map,i)=> {map[i.index] = i.slot; return map;}, {})
  let inventory = globalState.auction.items.map(item=> {
    item["equipped"] = !!equipped[item.index]
    return item
  })

  var dom = []
  for (var i = 0; i < inventory.length; i += 4) {
    let bagItems = inventory.slice(i, i + 4).map(({index, equipped, count})=> {
      let item = get_item(index)
      if (!item)
        return
      let enchant_level = item.enchant_level
      return (
        <div id="sellItem" key={index}>
            <img id="eImg" src="/assets/ui/e.png" style={{display: equipped ? "unset" : "none"}} alt="" />
            <img class="myBtn" src={`/assets/items/${item ? item.texture : "Apple"}.png`} alt="" onClick={(e)=> setGlobalState({ui: {auction_item_model_index: index}})} />
            <p className="sell-item-count">{count}</p>
            <p className="sell-item-levelUp">{enchant_level > 0 ? `+#{enchant_level}` : ""}</p>
        </div>
    )})
    dom.push(
        <div class="sell-body-col" key={i}>
            {bagItems}
        </div>
    )
  }
  return dom
}

function AuctionListed() {
  return globalState.auction.query.map(e=> {
    const item = get_item(e.index)
    const price = window.nearApi.utils.format.formatNearAmount(e.price, 2)
    const detail = get_item_stats(e.index).join(" / ")
    return (
      <tr key={e.sale_id}>
        <td class="td-fav"><i style={{visibility: "hidden"}} class="far fa-star"></i></td>
        <td><img src={`/assets/items/${item ? item.texture : "Apple"}.png`} alt="" /></td>
        <td>
          <p class="td-title">{item.name}</p>
          <span class="td-detail">{detail}</span>
        </td>
        <td class="table-price">
          <img src="assets/ui/near_icon_wht.png" alt="" />
          <p>{price}</p>
        </td>
        <td class="merch-list">
          {BigInt(globalState.balance) >= BigInt(e.price) ? <button onClick={()=> nft_market_buy(e.sale_id, e.price)}>Buy</button> : null}
        </td>
      </tr>
    )
  })
}

function SampleFill() {
  let arr = [];
  for (let x = 0; x < 33; x++) {
    arr.push(
      <tr>
        <td class="td-fav"><i style={{visibility: "hidden"}} class="far fa-star"></i></td>
        <td><img src="assets/ui/active1.png" alt="" /></td>
        <td>
          <p class="td-title">Keshanberk</p>
          <span class="td-detail">Weapon Damage +17 / Accuracy +4 / Extra Damage +2</span>
        </td>
        <td class="table-price">
          <img src="assets/ui/near_icon_wht.png"    alt="" />
          <p>22</p>
        </td>
        <td class="merch-list"><button>Buy</button></td>
      </tr>
    )
  }
  return arr 
}
