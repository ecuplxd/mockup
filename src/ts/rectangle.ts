import { Line } from './line';
import { IPoint, IPos } from './model';
import { IDirection } from './const';

export class Rectangle {
  ht: Line;
  hb: Line;
  vl: Line;
  vr: Line;

  ptl: IPoint;
  ptr: IPoint;
  pbl: IPoint;
  pbr: IPoint;

  ref: HTMLElement;

  constructor(public pos?: IPos, public type: string = '') {
    this.ht = new Line(null, null, `${this.type} ${IDirection.TOP}`);
    this.hb = new Line(null, null, `${this.type} ${IDirection.BOTTOM}`);
    this.vl = new Line(null, null, `${this.type} ${IDirection.LEFT}`);
    this.vr = new Line(null, null, `${this.type} ${IDirection.RIGHT}`);
    if (pos) {
      this.update(pos);
    }
  }

  setRef(el: HTMLElement) {
    this.ref = el;
    return this;
  }

  setPos(pos: IPos) {
    this.pos = pos || this.pos;
    // left top/left right/bottom left/bottom right
    this.ptl = { x: this.pos.left, y: this.pos.top };
    this.ptr = { x: this.pos.right, y: this.pos.top };
    this.pbl = { x: this.pos.left, y: this.pos.bottom };
    this.pbr = { x: this.pos.right, y: this.pos.bottom };
    return this;
  }

  update(pos: IPos) {
    this.setPos(pos);
    this.ht.update(this.ptl, this.ptr);
    this.hb.update(this.pbl, this.pbr);
    this.vl.update(this.ptl, this.pbl);
    this.vr.update(this.ptr, this.pbr);
    return this;
  }

  /* TODO: a better cal algorithm */
  diff(react: Rectangle) {
    const trickPoints: Array<IPoint[]> = [];
    const vx = this.ptl.x + this.ht.width / 2;
    const hy = this.ptl.y + this.vl.height / 2;
    const inTop = this.ptl.y >= react.pbl.y;
    const inBottom = this.pbl.y <= react.ptl.y;
    const inLeft = this.ptl.x >= react.ptr.x;
    const inRight = this.ptr.x <= react.ptl.x;
    const flag = [inTop, inBottom, inLeft, inRight];

    const pointTT: IPoint = { x: vx, y: react.pbl.y };
    const pointTB: IPoint = { x: vx, y: this.ptl.y };

    if (!inTop) {
      pointTT.y = pointTB.y;
    }

    const pointBT: IPoint = { x: vx, y: this.pbl.y };
    const pointBB: IPoint = { x: vx, y: react.ptl.y };

    if (!inBottom) {
      pointBB.y = pointBT.y;
    }

    if (flag.indexOf(true) < 0 && !inTop && !inBottom) {
      pointTT.y = react.ptl.y;
      pointTB.y = this.ptl.y;

      pointBT.y = this.pbl.y;
      pointBB.y = react.pbl.y;
    }

    const pointLL: IPoint = { x: react.ptr.x, y: hy };
    const pointLR: IPoint = { x: this.ptl.x, y: hy };

    if (!inLeft) {
      pointLL.x = pointLR.x;
    }

    const pointRL: IPoint = { x: this.ptr.x, y: hy };
    const pointRR: IPoint = { x: react.ptl.x, y: hy };

    if (!inRight) {
      pointRR.x = pointRL.x;
    }

    if (flag.indexOf(true) < 0 && !inLeft && !inRight) {
      pointLL.x = react.ptl.x;
      pointLR.x = this.ptl.x;

      pointRL.x = this.ptr.x;
      pointRR.x = react.ptr.x;
    }

    trickPoints.push([pointTT, pointTB]);
    trickPoints.push([pointBT, pointBB]);
    trickPoints.push([pointLL, pointLR]);
    trickPoints.push([pointRL, pointRR]);
    return trickPoints;
  }
}
