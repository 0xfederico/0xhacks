/////// toggle light-dark theme
function setDark() {
  document.querySelector('#switch_dark_light_theme').checked = true;
  document.documentElement.setAttribute('data-theme', 'dark');
  document.cookie = "theme=dark; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=None; Secure";
}

function setLight() {
  document.querySelector('#switch_dark_light_theme').checked = false;
  document.documentElement.setAttribute('data-theme', 'light');
  document.cookie = "theme=light; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=None; Secure";
}

document.querySelector('#switch_dark_light_theme').addEventListener('change', function() {
  if(this.checked)
    setDark();
  else
    setLight();
});

let themecookie = decodeURIComponent(document.cookie);
if (themecookie != "") { // site already visited
  if (themecookie.includes('theme=dark'))
    setDark();
  else if (themecookie.includes('theme=light'))
    setLight();
}
else { // first visit to the site
  if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDark();
  else
    setLight();
}



/////// search blog post
function filterElements(input, target) {
  let inp = input.value.toLowerCase();
  let targets = document.querySelectorAll(target);
  for (let i = 0; i < targets.length; i++) {
    if (inp.length == 0)
      targets[i].style.display = "flex";
    else {
      if (targets[i].outerText.toLowerCase().includes(inp))
        targets[i].style.display = "flex";
      else
        targets[i].style.display = "none";
    }
  }
}



/////// disable scroll https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
let keys = {37: 1, 38: 1, 39: 1, 40: 1}; // left: 37, up: 38, right: 39, down: 40,
                                         // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

let supportsPassive = false; // modern Chrome requires { passive: false } when adding event
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch(e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

function scroll_manager(input) {
  if (input.checked)
    disableScroll();
  else
    enableScroll();
}
