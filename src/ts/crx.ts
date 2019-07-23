import Mockup from './mockup';
import { PAUSED } from './const';

declare var chrome: any;

const mockup = new Mockup();

// 必须要有参数，否则 background 收不到
chrome.runtime.sendMessage({ value: "init", href: location.origin });

chrome.runtime.onMessage.addListener((request: any, sender: any, sendResponse: any) => {
    if (!request) {
        return;
    }
    mockup.pause(request.value);
    mockup.body.className = `${mockup.oldCls} ${request.value ? PAUSED : ''}`
});

