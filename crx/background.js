const _colors = [
  {
    name: 'hoverColor',
    value: '#419BF9',
    inputEl: '',
  },
  {
    name: 'selectedColor',
    value: '#EE6723',
    inputEl: '',
  },
  {
    name: 'fontColor',
    value: '#FFFFFF',
    inputEl: '',
  },
];

const _sendMessageToContentScript = (message, callback) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) {
      return;
    }

    chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
      callback && callback(response);
    });
  });
};

window._colors = _colors;
window._sendMessageToContentScript = _sendMessageToContentScript;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case 'init':
      sendResponse({
        color: _colors.reduce((color, cur) => {
          color[cur.name] = localStorage.getItem(cur.name) || cur.value;
          return color;
        }, {}),
      });
      break;
    default:
      break;
  }
});
