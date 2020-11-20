const donate = document.getElementById('donate');
const qrcode = document.getElementById('qrcode');
const qrcodeImage = document.getElementById('qrcodeImage');

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
