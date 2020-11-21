import Mockup from './mockup';

declare var NODE_ENV: string;
declare var chrome: any;

const chromeRuntimeExits = chrome && chrome.runtime;
const mockup = new Mockup(NODE_ENV !== 'development');

if (chromeRuntimeExits) {
  chrome.runtime.sendMessage({ message: 'init' }, (payload: any) =>
    mockup.injectStyle(payload.color)
  );

  chrome.runtime.onMessage.addListener(
    (
      message: { key: string; payload: any },
      sender: any,
      sendResponse: () => void
    ) => {
      switch (message.key) {
        case 'colorChanged':
          mockup.injectStyle(message.payload.color);
          break;
        default:
          break;
      }

      sendResponse();
    }
  );
}
