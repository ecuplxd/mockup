import { Line } from "./line";
import { IPoint } from "./model";
import { TRICK, IDirection } from "./const";

export class Trick {
    vt_trick: Line;
    vb_trick: Line;
    hl_trick: Line;
    hr_trick: Line;

    constructor() {
        this.vt_trick = new Line(null, null, `${TRICK} ${IDirection.TOP}`);
        this.vb_trick = new Line(null, null, `${TRICK} ${IDirection.BOTTOM}`);
        this.hl_trick = new Line(null, null, `${TRICK} ${IDirection.LEFT}`);
        this.hr_trick = new Line(null, null, `${TRICK} ${IDirection.RIGHT}`);
    }

    update(points: Array<IPoint[]>) {
        this.vt_trick.update(points[0][0], points[0][1]);
        this.vb_trick.update(points[1][0], points[1][1]);
        this.hl_trick.update(points[2][0], points[2][1]);
        this.hr_trick.update(points[3][0], points[3][1]);
        return this;
    }
}
