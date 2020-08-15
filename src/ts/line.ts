import { IPoint, IObject } from './model';
import { createEl, toDataAttr, setStyle, setAttribute } from './utils';
import {
  DIV,
  VERTICAL,
  HORIZONATAL,
  LINE,
  PREFIX,
  IDirection,
  GUIDE,
} from './const';

// TODO: Add a Point class
export class Line {
  direction: string;
  width: number;
  height: number;
  left: number;
  top: number;
  el: HTMLElement;
  // Note: order to align el
  rightDelta: number;
  bottomDelta: number;
  isGuide: boolean = false;

  constructor(
    private point1: IPoint = { x: 0, y: 0 },
    private point2: IPoint = { x: 9999999, y: 0 },
    private cls: string = ''
  ) {
    this.el = createEl(DIV);
    this.rightDelta = this.cls.indexOf(IDirection.RIGHT) !== -1 ? -1 : 0;
    this.bottomDelta = this.cls.indexOf(IDirection.BOTTOM) !== -1 ? -1 : 0;
    this.isGuide = this.cls.indexOf(GUIDE) !== -1;
  }

  setDirection(point1: IPoint, point2: IPoint) {
    if (!point1) {
      return false;
    }
    this.point1 = point1 || this.point1;
    this.point2 = point2 || this.point2;
    this.width = Math.abs(this.point1.x - this.point2.x);
    this.height = Math.abs(this.point1.y - this.point2.y);
    this.left = Math.min(this.point1.x, this.point2.x) + this.rightDelta;
    this.top = Math.min(this.point1.y, this.point2.y) + this.bottomDelta;

    if (this.point1.x === this.point2.x) {
      this.direction = VERTICAL;
    }
    if (this.point1.y === this.point2.y) {
      this.direction = HORIZONATAL;
    }
    return true;
  }

  update(point1: IPoint, point2: IPoint) {
    this.setDirection(point1, point2);
    const styleObject: IObject = {
      left: `${this.left}px`,
      top: `${this.top}px`,
      height: `${this.height}px`,
      width: `${this.width}px`,
    };

    const dataAttr = toDataAttr({
      width: this.width,
      height: this.height,
    });

    if (this.isGuide) {
      delete styleObject.height;
      delete styleObject.width;
    }

    const direction = this.direction ? `${this.direction}` : '';
    dataAttr.class = `${PREFIX} ${LINE} ${direction} ${this.cls}`;
    this.el = setStyle(this.el, styleObject);
    this.el = setAttribute(this.el, dataAttr);
    return this;
  }
}
