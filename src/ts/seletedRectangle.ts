import { IPoint, IPos } from './model';
import { Rectangle } from './rectangle';
import { Line } from './line';
import { POINT, SELETED, IDirection } from './const';

export class SeletedRectangle extends Rectangle {
  tl: Line;
  tr: Line;
  bl: Line;
  br: Line;
  // TODO: use Point class impl
  ptl_point: IPoint;
  ptr_point: IPoint;
  pbl_point: IPoint;
  pbr_point: IPoint;
  constructor() {
    super(null, SELETED);
    // Note: need to init extra 4 poin coordinate
    this.tl = new Line(null, null, `${POINT} ${IDirection.TOPLEFT}`);
    this.tr = new Line(null, null, `${POINT} ${IDirection.TOPRIGHT}`);
    this.bl = new Line(null, null, `${POINT} ${IDirection.BOTTOMLEFT}`);
    this.br = new Line(null, null, `${POINT} ${IDirection.BOTTOMRIGH}`);
  }

  setPos(pos: IPos) {
    super.setPos(pos);
    // left top/left right/bottom left/bottom right
    const delta = 4.5;
    this.ptl_point = { x: this.ptl.x, y: this.ptl.y };
    this.ptr_point = { x: this.ptr.x - delta, y: this.ptr.y };
    this.pbl_point = { x: this.pbl.x, y: this.pbl.y - delta };
    this.pbr_point = { x: this.pbr.x - delta, y: this.pbr.y - delta };
    return this;
  }

  update(pos: IPos) {
    super.update(pos);
    this.tl.update(this.ptl_point, this.ptl);
    this.tr.update(this.ptr_point, this.pbr);
    this.bl.update(this.pbl_point, this.pbl);
    this.br.update(this.pbr_point, this.pbr);
    return this;
  }
}
