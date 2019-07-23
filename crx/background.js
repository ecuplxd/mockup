var _pause = JSON.parse(localStorage.getItem("_pause")) || {};

var _sendMessageToContentScript = (message, callback) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, message, response => {
            callback && callback(response);
        });
    });
}

var _updateLocalStorage = () => {
    localStorage.setItem("_pause", JSON.stringify(_pause));
}

// 监听来自 content-script 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const href = request.href;
    if (_pause[href] === undefined) {
        _pause[href] = true;
        _updateLocalStorage();
    }
    _sendMessageToContentScript({ value: _pause[href] });
});
