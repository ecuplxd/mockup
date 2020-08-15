var _pause = JSON.parse(localStorage.getItem('_pause')) || {};

var _sendMessageToContentScript = (message, callback) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
        callback && callback(response);
      });
    }
  });
};

var _updateLocalStorage = () => {
  localStorage.setItem('_pause', JSON.stringify(_pause));
};

// listen message from content-script/popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const href = request.href;
  if (_pause[href] === undefined) {
    _pause[href] = true;
  }

  switch (request.message) {
    case 'udpate_pause':
      _pause[href] = request.pause;
      break;
    case 'init': {
      _sendMessageToContentScript({
        pause: _pause[href],
        from: 'background',
        message: `handle ${request.from} ${request.message}`,
      });
      break;
    }
    default:
      break;
  }
  _updateLocalStorage();
  sendResponse();
});
