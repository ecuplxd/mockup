import { IPoint, IPos } from "./model";
import { Rectangle } from "./rectangle";
import { Line } from "./line";
import { POINT, SELETED, IDirection } from "./const";

export class SeletedRectangle extends Rectangle {
    tl: Line;
    tr: Line;
    bl: Line;
    br: Line;
    // TODO: 使用 Point 类 实现
    ptl_point: IPoint;
    ptr_point: IPoint;
    pbl_point: IPoint;
    pbr_point: IPoint;
    constructor() {
        super(null, SELETED);
        // 额外初始化四个点的坐标
        this.tl = new Line(null, null, `${POINT} ${IDirection.TOPLEFT}`);
        this.tr = new Line(null, null, `${POINT} ${IDirection.TOPRIGHT}`);
        this.bl = new Line(null, null, `${POINT} ${IDirection.BOTTOMLEFT}`);
        this.br = new Line(null, null, `${POINT} ${IDirection.BOTTOMRIGH}`);
    }

    setPos(pos: IPos) {
        super.setPos(pos);
        // 上左 上右 下左 下右的四个点
        this.ptl_point = { x: this.ptl.x - 3, y: this.ptl.y - 3 };
        this.ptr_point = { x: this.ptr.x, y: this.ptr.y - 3 };
        this.pbl_point = { x: this.pbl.x - 3, y: this.pbl.y };
        this.pbr_point = { x: this.pbr.x, y: this.pbr.y };
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
