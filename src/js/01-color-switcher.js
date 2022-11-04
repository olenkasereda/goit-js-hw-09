let getEl = selector => document.querySelector(selector);
getEl('button[data-start]').addEventListener('click', startChangeСolorBody);
getEl('button[data-stop]').addEventListener('click', stopChangeСolorBody);
const DELAY = 1000;
let timerId = null;
//----------------------------------------------------------------
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

getEl('button[data-stop]').setAttribute('disabled', true);
//----------------------------------------------------------------
function startChangeСolorBody() {
  getEl('button[data-start]').disabled = true;
  getEl('button[data-stop]').disabled = false;

  timerId = setInterval(() => {
    console.log((document.body.style.backgroundColor = getRandomHexColor()));
  }, DELAY);
}
//----------------------------------------------------------------
function stopChangeСolorBody() {
  getEl('button[data-start]').disabled = false;
  getEl('button[data-stop]').disabled = true;

  clearInterval(timerId);
}
