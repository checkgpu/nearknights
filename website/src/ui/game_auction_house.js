import React, { useRef, useState, useLayoutEffect } from "react";
import { globalState, setGlobalState } from "../state.js"

export  function AuctionHouse() {
  const [showTab, setShowTab] = useState(true);
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [counter, setCounter] = useState(1);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  return (
    <div id="overlay">
    {/* top header */}
     <section class="header">
        <div class="main-header">
          <div class="left-head">
            <div class="exp-bars">
              <div class="red-bar">
                <p>1278/1278</p>
              </div>
              <div class="blue-bar">
                <p>731/731</p>
              </div>
            </div>
            <div class="skills">
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
            </div>
          </div>
          <div class="mid-head">
            <div>
              <img class="diamond-icon" src="assets/ui/near_icon_wht.png" alt="" />
            </div>
            <div>
              <p>0</p>
            </div>
            <div>
              <img src="assets/ui/close.png" class="head-plus" alt="" />
            </div>
            <div>
              <img src="assets/ui/coin.png" alt="" />
            </div>
            <div>
              <p>228,786</p>
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
                <img src="assets/ui/exit.png" alt="" />
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
            <div class="navbar-item"><p>Claim Earnings</p></div>
            <div class="navbar-item"><p>History</p></div>
          </div>
          <div class="nav-right">
            <div><b>Current Tax Rate 8%</b><span> (Castle Tax Rate 5% + Basic Tax Rate 3%)</span></div>
          </div>
        </div>
    </section>
    {/* <!-- -------------  Search tab start ------------------- --> */}
    <section class="search-tab" id="Search" style={{ display: showTab ? "block" : "none" }} >
        <section class="sidebar">
          <div id="sidebarMenu" class="main-sidebar">
            <div class="sidebar-item"><p>Main</p></div>
            <div class="sidebar-item"><p>All</p></div>
            <div class="sidebar-item sidebar-active">
              <p>Weapon</p> 
              <span>Sword</span>
            </div>
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
                <option disabled selected>Filter</option>
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
                  <th colspan="2">Favorites</th>
                  <th>Item</th>
                  <th>Minimum Price</th>
                  <th>Merchandise List</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="td-fav"><i class="far fa-star"></i></td>
                  <td><img src="assets/ui/active1.png" alt="" /></td>
                  <td>
                    <p class="td-title">Keshanberk</p>
                    <span class="td-detail">Weapon Damage +17 / Accuracy +4 / Extra Damage +2</span>
                  </td>
                  <td class="table-price">
                    <img src="assets/ui/near_icon_wht.png" alt="" /> 
                    <p>22</p>
                  </td>
                  <td class="merch-list">4</td>
                </tr>
                <tr>
                  <td class="td-fav"><i class="far fa-star"></i></td>
                  <td><img src="assets/ui/active1.png" alt="" /></td>
                  <td>
                    <p class="td-title">Keshanberk</p>
                    <span class="td-detail">Weapon Damage +17 / Accuracy +4 / Extra Damage +2</span>
                  </td>
                  <td class="table-price">
                    <img src="assets/ui/near_icon_wht.png"    alt="" />
                    <p>22</p>
                  </td>
                  <td class="merch-list">4</td>
                </tr>
                <tr>
                  <td class="td-fav"><i class="far fa-star"></i></td>
                  <td><img src="assets/ui/active1.png" alt="" /></td>
                  <td>
                    <p class="td-title">Keshanberk</p>
                    <span class="td-detail">Weapon Damage +17 / Accuracy +4 / Extra Damage +2</span>
                  </td>
                  <td class="table-price">
                    <img src="assets/ui/near_icon_wht.png"    alt="" />
                    <p>22</p>
                  </td>
                  <td class="merch-list">4</td>
                </tr>
                <tr>
                  <td class="td-fav"><i class="far fa-star"></i></td>
                  <td><img src="assets/ui/active1.png" alt="" /></td>
                  <td>
                    <p class="td-title">Keshanberk</p>
                    <span class="td-detail">Weapon Damage +17 / Accuracy +4 / Extra Damage +2</span>
                  </td>
                  <td class="table-price">
                    <img src="assets/ui/near_icon_wht.png"    alt="" />
                    <p>22</p>
                  </td>
                  <td class="merch-list">4</td>
                </tr>
                <tr>
                  <td class="td-fav"><i class="far fa-star"></i></td>
                  <td><img src="assets/ui/active1.png" alt="" /></td>
                  <td>
                    <p class="td-title">Keshanberk</p>
                    <span class="td-detail">Weapon Damage +17 / Accuracy +4 / Extra Damage +2</span>
                  </td>
                  <td class="table-price">
                    <img src="assets/ui/near_icon_wht.png"    alt="" />
                    <p>22</p>
                  </td>
                  <td class="merch-list">4</td>
                </tr>
                <tr>
                  <td class="td-fav"><i class="far fa-star"></i></td>
                  <td><img src="assets/ui/active1.png" alt="" /></td>
                  <td>
                    <p class="td-title">Keshanberk</p>
                    <span class="td-detail">Weapon Damage +17 / Accuracy +4 / Extra Damage +2</span>
                  </td>
                  <td class="table-price">
                    <img src="assets/ui/near_icon_wht.png"    alt="" />
                    <p>22</p>
                  </td>
                  <td class="merch-list">4</td>
                </tr>
                <tr>
                  <td class="td-fav"><i class="far fa-star"></i></td>
                  <td><img src="assets/ui/active1.png" alt="" /></td>
                  <td>
                    <p class="td-title">Keshanberk</p>
                    <span class="td-detail">Weapon Damage +17 / Accuracy +4 / Extra Damage +2</span>
                  </td>
                  <td class="table-price">
                    <img src="assets/ui/near_icon_wht.png"    alt="" />
                    <p>22</p>
                  </td>
                  <td class="merch-list">4</td>
                </tr>
                <tr>
                  <td class="td-fav"><i class="far fa-star"></i></td>
                  <td><img src="assets/ui/active1.png" alt="" /></td>
                  <td>
                    <p class="td-title">Keshanberk</p>
                    <span class="td-detail">Weapon Damage +17 / Accuracy +4 / Extra Damage +2</span>
                  </td>
                  <td class="table-price">
                    <img src="assets/ui/near_icon_wht.png"    alt="" />
                    <p>22</p>
                  </td>
                  <td class="merch-list">4</td>
                </tr>
                <tr>
                  <td class="td-fav"><i class="far fa-star"></i></td>
                  <td><img src="assets/ui/active1.png" alt="" /></td>
                  <td>
                    <p class="td-title">Keshanberk</p>
                    <span class="td-detail">Weapon Damage +17 / Accuracy +4 / Extra Damage +2</span>
                  </td>
                  <td class="table-price">
                    <img src="assets/ui/near_icon_wht.png"    alt="" />
                    <p>22</p>
                  </td>
                  <td class="merch-list">4</td>
                </tr>
                <tr>
                  <td class="td-fav"><i class="far fa-star"></i></td>
                  <td><img src="assets/ui/active1.png" alt="" /></td>
                  <td>
                    <p class="td-title">Keshanberk</p>
                    <span class="td-detail">Weapon Damage +17 / Accuracy +4 / Extra Damage +2</span>
                  </td>
                  <td class="table-price">
                    <img src="assets/ui/near_icon_wht.png"    alt="" />
                    <p>22</p>
                  </td>
                  <td class="merch-list">4</td>
                </tr>
                <tr>
                  <td class="td-fav"><i class="far fa-star"></i></td>
                  <td><img src="assets/ui/active1.png" alt="" /></td>
                  <td>
                    <p class="td-title">Keshanberk</p>
                    <span class="td-detail">Weapon Damage +17 / Accuracy +4 / Extra Damage +2</span>
                  </td>
                  <td class="table-price">
                    <img src="assets/ui/near_icon_wht.png"    alt="" />
                    <p>22</p>
                  </td>
                  <td class="merch-list">4</td>
                </tr>
                <tr>
                  <td class="td-fav"><i class="far fa-star"></i></td>
                  <td><img src="assets/ui/active1.png" alt="" /></td>
                  <td>
                    <p class="td-title">Keshanberk</p>
                    <span class="td-detail">Weapon Damage +17 / Accuracy +4 / Extra Damage +2</span>
                  </td>
                  <td class="table-price">
                    <img src="assets/ui/near_icon_wht.png" alt="" />
                    <p>22</p>
                  </td>
                  <td class="merch-list">4</td>
                </tr>
                <tr>
                  <td class="td-fav"><i class="far fa-star"></i></td>
                  <td><img src="assets/ui/active1.png" alt="" /></td>
                  <td>
                    <p class="td-title">Keshanberk</p>
                    <span class="td-detail">Weapon Damage +17 / Accuracy +4 / Extra Damage +2</span>
                  </td>
                  <td class="table-price">
                    <img src="assets/ui/near_icon_wht.png"    alt="" />
                    <p>22</p>
                  </td>
                  <td class="merch-list">4</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="footer">
            <div>
              <button>Refresh</button>
            </div>
          </div>
        </section>
    </section>
    {/* <!-- -------------  Search tab End ------------------- --> */}

    {/* <!-- -------------  Sell tab start ------------------- --> */}
    <section class="sell-tab" id="Sell" style={{ display: !showTab ? "block" : "none" }} >
      <div class="sell-container">
        <div class="left-sell">
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
              <div class="sell-body-col">
                <img class="myBtn" onClick={() => setShow((s) => !s)} src="assets/ui/active2.png" alt="" />
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
                <img class="myBtn"  src="assets/ui/active2.png" alt="" />
                <img class="myBtn" src="assets/ui/active2.png" alt="" /> 
              </div>
              <div class="sell-body-col">
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
              </div>
              <div class="sell-body-col">
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
              </div>
              <div class="sell-body-col">
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
              </div>
              <div class="sell-body-col">
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
                <img class="myBtn" src="assets/ui/active2.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* <!-- The Modal --> */}
      <div id="myModal" class="modal" style={{ display: show ? "block" : "none" }}>
          {/* <!-- Modal content --> */}
          <div class="modal-content">
            {/* <!-- <span class="close">&times;</span> --> */}
            <div class="top-modal-content">
              <div>
                <img src="assets/ui/passive1.png" alt="" />
              </div>
              <div class="top-col-modal">
                <p>Ol Mahum Warlock's Orb</p>
                <b>Current Tax Rate 8%</b><span> (Castle Tax Rate 5% + Basic Tax Rate 3%)</span>
              </div>
            </div>
            <div class="mid-modal-content">
              <div class="mid-modal-left">
                <p class="mid-modal-left-title">Orb</p>
                <div class="mid-modal-two-row">
                  <img src="assets/ui/spark.png" alt="" />
                  <p>Weapon Damage +6</p>
                </div>
                <div class="mid-modal-two-row">
                  <img src=" " alt="" style={{opacity:"0"}} />
                  <p>Double Chance +10%</p>
                </div>
                <div class="mid-modal-two-row">
                  <img src=" " alt="" style={{opacity:"0"}} />
                  <p>Max MP +30</p>
                </div>
                <div class="mid-modal-two-row">
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
                </div>
              </div>
              <div class="mid-modal-right">
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
              </div>
            </div>
            <div class="bottom-modal-content">
              <div class="bottom-modal-left">
                <div>
                  <p>Quantity</p>
                  <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div>
                  <p>Price Per Unit</p>
                  <div>
                    <span>10</span>
                    <img src="assets/ui/near_icon_wht.png" alt="" />
                  </div>
                </div>
                <hr class="hr-style" />
                <div class="total-price-div">
                  <p>Total Price</p>
                  <input class="total-input" type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                  <img src="assets/ui/near_icon_wht.png" alt="" />
                </div>
              </div>
              <div class="bottom-modal-right">
                <div class="cal-input">
                  <button id="cal-minus" onClickFunc={decrementCounter}><i class="fas fa-minus"></i></button>
                  <input id="cal-display" type="number" value={counter} onChange={(e) => setCounter(e.target.value)} />
                  <button id="cal-plus" onClickFunc={incrementCounter}><i class="fas fa-plus"></i></button>
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
              </div>
            </div>
            <div class="bottom-modal-bottom">
              <button class="close" onClick={() => setShow((s) => !s)}>Cancel</button>
              <button>Confirm</button>
            </div>
          </div>
      </div>

      <div class="footer">  
          <div>
            <p>Sell</p>
            <span>0/30</span>
          </div>
          <div>
            <p>Total Price</p>
            <img src="assets/ui/near_icon_wht.png" alt="" /> 
            <span>0</span>
          </div>
      
      </div>
    </section>

    {/* <!-- -------------  Sell tab End ------------------- --> */}  

    </div>
  );
}
