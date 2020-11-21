const donate = document.getElementById('donate');
const qrcode = document.getElementById('qrcode');
const qrcodeImage = document.getElementById('qrcodeImage');
const bg = chrome.extension.getBackgroundPage();
const colors = bg._colors;
const sendMessageToContentScript = bg._sendMessageToContentScript;

const initColorByStorage = () => {
  colors.forEach((color) => {
    color.inputEl = document.getElementById(color.name);
    color.inputEl.value = localStorage.getItem(color.name) || color.value;
    delete color.value;
  });
};

const setStorageColor = () => {
  colors.forEach((color) => {
    localStorage.setItem(color.name, color.inputEl.value);
  });
};

const getCurrentColor = () => {
  return colors.reduce((color, cur) => {
    color[cur.name] = cur.inputEl.value;
    return color;
  }, {});
};

const emitColorChange = () => {
  setStorageColor();
  sendMessageToContentScript({
    key: 'colorChanged',
    payload: {
      color: getCurrentColor(),
    },
  });
};

const translateHTML = () => {
  const els = document.getElementsByClassName(`i18n-message`);
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    const key = el.getAttribute('data-message');
    const message = chrome.i18n.getMessage(key);
    el.innerText = message;
  }

  donate.setAttribute('title', chrome.i18n.getMessage('donateTip'));
  qrcodeImage.setAttribute('alt', chrome.i18n.getMessage('donateImgAlt'));
  document.title = chrome.i18n.getMessage('extName');
};

donate.onmouseover = () => {
  qrcode.style.opacity = 1;
};

donate.onmouseout = () => {
  qrcode.style.opacity = 0;
};

translateHTML();
initColorByStorage();

colors[0].inputEl.onchange = emitColorChange;
colors[1].inputEl.onchange = emitColorChange;
colors[2].inputEl.onchange = emitColorChange;
