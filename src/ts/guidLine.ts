import { Rectangle } from './rectangle';
import { IPos } from './model';
import { getScroll, setStyle } from './utils';
import { GUIDE, WIDTH } from './const';

export class GuideLine extends Rectangle {
  constructor() {
    super(null, GUIDE);
  }

  setPos(pos: IPos) {
    this.setHPos(pos);
    this.setVPos(pos);
    return this;
  }

  setHPos(pos: IPos) {
    const right = getScroll(WIDTH) - 1;
    this.pos = pos || this.pos;
    this.ptl = { x: 0, y: this.pos.top };
    this.ptr = { x: right, y: this.pos.top };
    this.pbl = { x: 0, y: this.pos.bottom };
    this.pbr = { x: right, y: this.pos.bottom };
    this.ht.update(this.ptl, this.ptr);
    this.hb.update(this.pbl, this.pbr);
    setStyle(this.ht.el, {
      right: 0,
      width: 'initial',
    });
    setStyle(this.hb.el, {
      right: 0,
      width: 'initial',
    });
    return this;
  }

  setVPos(pos: IPos) {
    this.pos = pos || this.pos;
    const bottom = getScroll();
    this.ptl = { x: this.pos.left, y: 0 };
    this.pbl = { x: this.pos.left, y: bottom };
    this.ptr = { x: this.pos.right, y: 0 };
    this.pbr = { x: this.pos.right, y: bottom };
    this.vl.update(this.ptl, this.pbl);
    this.vr.update(this.ptr, this.pbr);
    return this;
  }

  update(pos: IPos) {
    this.setPos(pos);
    return this;
  }
}

export default GuideLine;
