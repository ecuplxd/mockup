import { cloneObj, getElDocumentPos, createEl } from './utils';
import { IPos, IPoint } from './model';
import { SeletedRectangle } from './seletedRectangle';
import { Rectangle } from './rectangle';
import { Trick } from './trick';
import GuideLine from './guidLine';
import {
  CTRL_KEYCODE,
  MOUSEMOVE,
  CLICK,
  KEYUP,
  RESIZE,
  SCROLL,
  MATCH,
  HASDIFF,
  HASSELETED,
  PREFIX,
  STYLE,
  P_KEYCODE,
  PAUSED,
} from './const';
import { styles } from './style';

class Mockup {
  _hasSeleted = false;
  _pause = false;
  curSeletedElRect = new SeletedRectangle();
  // TODO: guide line can be impl in hoverMatchEl
  hoverMatchElRect = new Rectangle(null, MATCH);
  guidLine = new GuideLine();
  trick = new Trick();
  body = document.body;
  oldCls = `${PREFIX} ` + this.body.className.trim();

  constructor(pause: boolean, private onPause?: Function) {
    this.handlerEvent = this.handlerEvent.bind(this);
    this._pause = pause;
    this.init();
  }

  diff() {
    // get delta
    if (
      this._hasSeleted &&
      this.curSeletedElRect &&
      this.curSeletedElRect.pos
    ) {
      if (this.curSeletedElRect.ref !== this.hoverMatchElRect.ref) {
        this.body.className = `${this.oldCls} ${HASDIFF}`.trim();
        const points: IPoint[][] = this.curSeletedElRect.diff(
          this.hoverMatchElRect
        );
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
    if (el === this.curSeletedElRect.ref) {
      return;
    }
    this._hasSeleted = true;
    this.updatePos(el, this.curSeletedElRect);
    this.body.className = `${this.oldCls} ${HASSELETED}`.trim();
    this.resetDiff();
  }

  updateAllPos() {
    const selectedEl = this.curSeletedElRect.ref;
    const hoverEl = this.hoverMatchElRect.ref;
    this.updatePos(selectedEl, this.curSeletedElRect, false);
    this.updatePos(hoverEl, this.hoverMatchElRect, false);
    this.updatePos(hoverEl, this.guidLine, false);
    this.diff();
  }

  handlerKeyUp(e: KeyboardEvent) {
    if (!this.hoverMatchElRect || !e.key) {
      return;
    }
    const key = e.key.toUpperCase();
    if (key === CTRL_KEYCODE && !this._pause) {
      this.seletedEl(this.hoverMatchElRect.ref);
    } else if (key === P_KEYCODE) {
      this.pause(!this._pause);
    }
  }

  handlerMousemove(e: MouseEvent) {
    const target = e.target as HTMLElement;

    if (target === this.hoverMatchElRect.ref) {
      return;
    }

    const { className } = target;
    // may be a SVG el
    if (className.indexOf && className.indexOf(PREFIX) < 0) {
      this.updatePos(target, this.hoverMatchElRect);
      this.updatePos(target, this.guidLine, false);
      this.diff();
    }
  }

  handlerClick(e: MouseEvent) {
    this.seletedEl(e.target as HTMLElement);
  }

  handlerEvent(e: MouseEvent | KeyboardEvent | UIEvent) {
    const { type, target } = e;
    const { nodeName } = target as HTMLElement;
    if (type !== KEYUP && target && nodeName === 'BODY') {
      return;
    }
    switch (type) {
      case CLICK:
        !this._pause && this.handlerClick(e as MouseEvent);
        break;
      case MOUSEMOVE:
        !this._pause && this.handlerMousemove(e as MouseEvent);
        break;
      case KEYUP:
        this.handlerKeyUp(e as KeyboardEvent);
        break;
      case RESIZE:
      case SCROLL:
        !this._pause && this.updateAllPos();
        break;
      default:
        break;
    }
  }

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
    window.addEventListener(SCROLL, this.handlerEvent, {
      capture: false,
      passive: true,
    });
  }

  pause(pause: boolean) {
    this._pause = pause;
    if (!pause) {
      this.updateAllPos();
    }
    this.body.className = `${this.oldCls} ${pause ? PAUSED : ''}`;
    this.onPause && this.onPause.call(null, this._pause);
  }
}

export default Mockup;
