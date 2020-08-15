const bg = chrome.extension.getBackgroundPage();
const pauseBtn = document.getElementById('pause-btn');
const status = document.getElementById('status');
const donate = document.getElementById('donate');
const qrcode = document.getElementById('qrcode');

const getCurTabState = (callback) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) {
      return;
    }
    const url = tabs[0].url;
    for (const key in bg._pause) {
      if (bg._pause.hasOwnProperty(key)) {
        if (url.includes(key)) {
          callback.call(null, key);
          break;
        }
      }
    }
  });
};

const setStateText = (_pause) => {
  if (_pause) {
    pauseBtn.innerText = '运行';
    status.innerText = '暂停';
  } else {
    pauseBtn.innerText = '暂停';
    status.innerText = '运行';
  }
};

getCurTabState((url) => {
  const pause = bg._pause[url];
  setStateText(pause);
  bg._sendMessageToContentScript({
    pause: pause,
    from: 'popup',
    message: 'popup show',
  });
});

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
