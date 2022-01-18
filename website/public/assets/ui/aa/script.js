// sidebar active menu
var sidebar = document.getElementById("sidebarMenu");
var items = sidebar.getElementsByClassName("sidebar-item");
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("sidebar-active");
  current[0].className = current[0].className.replace(" sidebar-active", "");
  this.className += " sidebar-active";
  });
}

// // navbar active menu
// var navbar = document.getElementById("navbarMenu");
// var items = navbar.getElementsByClassName("navbar-item");
// for (var i = 0; i < items.length; i++) {
//   items[i].addEventListener("click", function() {
//   var current = document.getElementsByClassName("navbar-active");
//   current[0].className = current[0].className.replace(" navbar-active", "");
//   this.className += " navbar-active";
//   });
// }

// right sell active menu
var navbar = document.getElementById("sellRightMenu");
var items = navbar.getElementsByClassName("sell-right-item");
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("right-sell-active");
  current[0].className = current[0].className.replace(" right-sell-active", "");
  this.className += " right-sell-active";
  });
}

// main tabbed search and sell
function openTab(evt, tabname) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" navbar-active", "");
  }
  document.getElementById(tabname).style.display = "block";
  evt.currentTarget.className += " navbar-active";

}

// modal
var modal = document.getElementById("myModal");
var btn = document.querySelectorAll('.myBtn')
var btnClose = document.getElementsByClassName("close")[0];


// btn.onclick = function() {
//   modal.style.display = "block";
// }

btn.forEach(item => {
  item.addEventListener('click', event => {
     modal.style.display = "block";
  })
})

btnClose.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// calculator
let display = document.getElementById('cal-display');
let minus = document.getElementById('cal-minus');
let plus = document.getElementById('cal-plus');
let buttons = Array.from(document.getElementsByClassName('cal-btn'));

minus.onclick = function() {
  display.value--
}
plus.onclick = function() {
  display.value++
}


buttons.map( button => {
  button.addEventListener('click', (e) => {
      switch(e.target.innerText){
          case 'C':
              display.value = '';
              break;
          case '=':
              try{
                  display.value = eval(display.value);
              } catch {
                  display.value = "Error"
              }
              break;
          case '←':
              if (display.value){
                 display.value = display.value.slice(0, -1);
              }
              break;
          case 'MAX':
            if (display.value){
              display.value = '';
            }
            break;    
          default:
              display.value += e.target.innerText;
      }
  });
});

