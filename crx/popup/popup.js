const bg = chrome.extension.getBackgroundPage();
const pauseBtn = document.getElementById('pause-btn');
const status = document.getElementById('status');
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
};

const getCurTabState = (callback) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) {
      status.innerText = chrome.i18n.getMessage('unavailable');
      pauseBtn.style.display = 'none';
      return;
    }
    const url = tabs[0].url || '';
    for (const key in bg._pause) {
      if (bg._pause.hasOwnProperty(key)) {
        if (url.includes(key)) {
          pauseBtn.style.display = 'inline-block';
          callback.call(null, key);
          return;
        }
      }
    }
    status.innerText = chrome.i18n.getMessage('unavailable');
    pauseBtn.style.display = 'none';
  });
};

const setStateText = (_pause) => {
  if (_pause) {
    pauseBtn.innerText = chrome.i18n.getMessage('run');
    status.innerText = chrome.i18n.getMessage('pausing');
  } else {
    pauseBtn.innerText = chrome.i18n.getMessage('pause');
    status.innerText = chrome.i18n.getMessage('running');
  }
};

pauseBtn.onclick = () => {
  getCurTabState((url) => {
    const pause = (bg._pause[url] = !bg._pause[url]);
    setStateText(pause);
    bg._updateLocalStorage();
    bg._sendMessageToContentScript({
      pause: pause,
      from: 'popup',
      message: 'btn clikc',
    });
  });
};

donate.onmouseover = () => {
  qrcode.style.opacity = 1;
};

donate.onmouseout = () => {
  qrcode.style.opacity = 0;
};

translateHTML();

getCurTabState((url) => {
  const pause = bg._pause[url];
  setStateText(pause);
  bg._sendMessageToContentScript({
    pause: pause,
    from: 'popup',
    message: 'popup show',
  });
});
