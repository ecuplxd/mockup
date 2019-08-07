import Mockup from './mockup';
import { PAUSED } from './const';

declare var chrome: any;
declare var NODE_ENV: string;

const mockup = new Mockup(NODE_ENV !== 'development');
// 必须要有参数，否则 background 收不到
if (chrome && chrome.runtime) {
    chrome.runtime.sendMessage({ value: "init", href: location.origin });

    chrome.runtime.onMessage.addListener((request: any, sender: any, sendResponse: any) => {
        if (!request) {
            return;
        }
        mockup.pause(request.value);
        mockup.body.className = `${mockup.oldCls} ${request.value ? PAUSED : ''}`;
    });
}
