var darkSwitch = document.getElementById("darkSwitch");
window.addEventListener("load", function () {
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener("change", function () {
      resetTheme();
    });
  }
});

/**
 * Summary: function that adds or removes the attribute 'data-theme' depending if
 * the switch is 'on' or 'off'.
 *
 * Description: initTheme is a function that uses localStorage from JavaScript DOM,
 * to store the value of the HTML switch. If the switch was already switched to
 * 'on' it will set an HTML attribute to the body named: 'data-theme' to a 'dark'
 * value. If it is the first time opening the page, or if the switch was off the
 * 'data-theme' attribute will not be set.
 * @return {void}
 */
function initTheme() {
  var darkThemeSelected =
    localStorage.getItem("darkSwitch") !== null &&
    localStorage.getItem("darkSwitch") === "dark";
  darkSwitch.checked = darkThemeSelected;
  darkThemeSelected
    ? document.body.setAttribute("data-theme", "dark")
    : document.body.removeAttribute("data-theme");


var formid = document.getElementById('formlibgen');
if (formid){
  darkThemeSelected
    ? document.forms["formlibgen"].setAttribute("data-theme", "dark")
    : document.forms["formlibgen"].removeAttribute("data-theme");
}

var tableid = document.getElementById('tablelibgen');
if (tableid){
  darkThemeSelected
    ? document.getElementById("tablelibgen").classList.add("table-dark")
    : document.getElementById("tablelibgen").classList.remove("table-dark");
   }

var tableid1 = document.getElementById('tablelibgen1');
if (tableid1){
  darkThemeSelected
    ? document.getElementById("tablelibgen1").classList.add("table-dark")
    : document.getElementById("tablelibgen1").classList.remove("table-dark");
   }
}

/**
 * Summary: resetTheme checks if the switch is 'on' or 'off' and if it is toggled
 * on it will set the HTML attribute 'data-theme' to dark so the dark-theme CSS is
 * applied.
 * @return {void}
 */
function resetTheme() {
var tableid = document.getElementById('tablelibgen');
var tableid1 = document.getElementById('tablelibgen1');
var formid = document.getElementById('formlibgen');

  if (darkSwitch.checked) {
    document.body.setAttribute("data-theme", "dark");
    if (formid ){document.forms["formlibgen"].setAttribute("data-theme", "dark");}
    if (tableid ){document.getElementById("tablelibgen").classList.add("table-dark");}
    if (tableid1 ){document.getElementById("tablelibgen1").classList.add("table-dark");}
    localStorage.setItem("darkSwitch", "dark");
  } else {
    document.body.removeAttribute("data-theme");
    if (formid ){document.forms["formlibgen"].removeAttribute("data-theme");}
    if (tableid ){document.getElementById("tablelibgen").classList.remove("table-dark");}
    if (tableid1 ){document.getElementById("tablelibgen1").classList.remove("table-dark");}
    localStorage.removeItem("darkSwitch");
  }
}