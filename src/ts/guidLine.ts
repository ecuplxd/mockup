import { Rectangle } from './rectangle';
import { IPos } from './model';
import { setStyle } from './utils';
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
    this.pos = pos || this.pos;
    this.ptl = { x: 0, y: this.pos.top };
    this.ptr = { x: 0, y: this.pos.top };
    this.pbl = { x: 0, y: this.pos.bottom };
    this.pbr = { x: 0, y: this.pos.bottom };
    this.ht.update(this.ptl, this.ptr);
    this.hb.update(this.pbl, this.pbr);
    setStyle(this.ht.el, {
      right: 0,
    });
    setStyle(this.hb.el, {
      right: 0,
    });
    return this;
  }

  setVPos(pos: IPos) {
    this.pos = pos || this.pos;
    this.ptl = { x: this.pos.left, y: 0 };
    this.pbl = { x: this.pos.left, y: 0 };
    this.ptr = { x: this.pos.right, y: 0 };
    this.pbr = { x: this.pos.right, y: 0 };
    this.vl.update(this.ptl, this.pbl);
    this.vr.update(this.ptr, this.pbr);
    setStyle(this.vl.el, {
      bottom: 0,
    });
    setStyle(this.vr.el, {
      bottom: 0,
    });
    return this;
  }

  update(pos: IPos) {
    this.setPos(pos);
    return this;
  }
}

export default GuideLine;
