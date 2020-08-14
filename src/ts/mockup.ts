import { cloneObj, getElDocumentPos, createEl } from './utils';
import { IPos, IPoint } from './model';
import { SeletedRectangle } from './seletedRectangle';
import { Rectangle } from './rectangle';
import { Trick } from './trick';
import GuideLine from './guidLine';
import {
  CTRLKEYCODE,
  MOUSEMOVE,
  CLICK,
  KEYUP,
  RESIZE,
  MATCH,
  HASDIFF,
  HASSELETED,
  PREFIX,
  STYLE,
} from './const';
import { styles } from './style';

class Mockup {
  _hasSeleted = false;
  _pause = false;
  curSeletedEl = new SeletedRectangle();
  // TODO:参考线可以考虑移动到 hoverMatchEl 实现
  hoverMatchEl = new Rectangle(null, MATCH);
  guidLine = new GuideLine();
  trick = new Trick();
  body = document.body;
  oldCls = `${PREFIX} ` + this.body.className.trim();

  constructor(pause: boolean) {
    this.handlerEvent = this.handlerEvent.bind(this);
    this._pause = pause;
    this.init();
  }

  diff() {
    // 获取差
    if (this._hasSeleted && this.curSeletedEl && this.curSeletedEl.pos) {
      if (this.curSeletedEl.ref !== this.hoverMatchEl.ref) {
        this.body.className = `${this.oldCls} ${HASDIFF}`.trim();
        const points: IPoint[][] = this.curSeletedEl.diff(this.hoverMatchEl);
        this.trick.update(points);
      }
    }
  }

  resetDiff() {
    const point: IPoint = { x: 0, y: 0 };
    const tempArr: IPoint[] = [point, point];
    const points: IPoint[][] = [tempArr, tempArr, tempArr, tempArr];
    this.trick.update(points);
  }

  updatePos(target: HTMLElement, type: Rectangle, setRef = true) {
    const pos: IPos = cloneObj(getElDocumentPos(target));
    type.update(pos);
    if (setRef) {
      type.setRef(target);
    }
  }

  seletedEl(el: HTMLElement) {
    this._hasSeleted = true;
    this.updatePos(el, this.curSeletedEl);
    this.body.className = `${this.oldCls} ${HASSELETED}`.trim();
    this.resetDiff();
  }

  updateAllPos() {
    // const pos = cloneObj(getElDocumentPos(this.curSeletedEl.ref));
    const { ref } = this.curSeletedEl;
    this.updatePos(ref, this.hoverMatchEl, false);
    this.updatePos(ref, this.curSeletedEl, false);
    this.updatePos(ref, this.guidLine, false);
  }

  handlerKeyUp(e: KeyboardEvent) {
    const { keyCode } = e;
    if (!this.hoverMatchEl || keyCode !== CTRLKEYCODE) {
      return;
    }
    this.seletedEl(this.hoverMatchEl.ref);
  }

  handlerMousemove(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const { className } = target;
    // 有可能是 SVG 元素
    if (className.indexOf && className.indexOf(PREFIX) < 0) {
      this.updatePos(target, this.hoverMatchEl);
      this.updatePos(target, this.guidLine, false);
      this.diff();
    }
  }

  handlerClick(e: MouseEvent) {
    this.seletedEl(e.target as HTMLElement);
  }

  handlerEvent(e: MouseEvent | KeyboardEvent | UIEvent) {
    if (this._pause) {
      return;
    }
    const { type, target } = e;
    const { nodeName } = target as HTMLElement;
    if (type !== KEYUP && target && nodeName === 'BODY') {
      return;
    }
    switch (type) {
      case CLICK:
        this.handlerClick(e as MouseEvent);
        break;
      case MOUSEMOVE:
        this.handlerMousemove(e as MouseEvent);
        break;
      case KEYUP:
        this.handlerKeyUp(e as KeyboardEvent);
        break;
      case RESIZE:
        this.updateAllPos();
        break;
      default:
        break;
    }
  }

  // TODO
  injectStyle() {
    const styleEl = createEl(STYLE);
    styleEl.innerHTML = styles;
    document.head.appendChild(styleEl);
  }

  init() {
    this.injectStyle();
    this.body.addEventListener(MOUSEMOVE, this.handlerEvent, false);
    this.body.addEventListener(CLICK, this.handlerEvent, false);
    this.body.addEventListener(KEYUP, this.handlerEvent, false);
    window.addEventListener(RESIZE, this.handlerEvent, false);
  }

  pause(flag: boolean) {
    this._pause = flag;
  }
}

export default Mockup;
