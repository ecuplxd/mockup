import Mockup from './mockup';

declare var chrome: any;
declare var NODE_ENV: string;

const chrome_exits = chrome && chrome.runtime;

const mockup = new Mockup(NODE_ENV !== 'development', (pause: boolean) => {
  if (chrome_exits) {
    chrome.runtime.sendMessage({
      href: location.origin,
      pause: pause,
      from: 'content-script',
      message: 'udpate_pause',
    });
  }
});

// must have args, otherwise background can't receive message
if (chrome_exits) {
  const { sendMessage, onMessage } = chrome.runtime;
  try {
    sendMessage({
      href: location.origin,
      from: 'content-script',
      message: 'init',
    });
  } catch (error) {}

  if (onMessage) {
    onMessage.addListener((request: any, sender: any, sendResponse: any) => {
      if (request) {
        mockup.pause(request.pause);
      }
      sendResponse();
    });
  }
}
