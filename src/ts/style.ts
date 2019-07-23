import {
    PREFIX,
    LINE,
    POINT,
    SELETED,
    GUIDE,
    TRICK,
    HASSELETED,
    VERTICAL,
    HORIZONATAL,
    HASDIFF,
    MATCH,
    IDirection,
    PAUSED,
} from "./const";

export const styles = `
body.${PREFIX}.${PAUSED} > div.${PREFIX} {
    display: none;
}

body.${HASDIFF} div.${LINE}.${TRICK}::before {
    display: block;
}

body.${HASSELETED} div.${LINE}.${VERTICAL}.${SELETED}.${IDirection.RIGHT}::before {
    content: attr(data-height);
    left: auto;
    right: 0;
    top: 50%;
    transform: translateX(calc(100% - 50px)) translateY(-50%);
}

body.${HASSELETED} div.${LINE}.${SELETED}.${IDirection.TOP}::before,
body.${HASSELETED} div.${LINE}.${SELETED}.${IDirection.RIGHT}::before {
    display: block;
}

div.${PREFIX} {
    border: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    position: absolute;
}

/* 线 */
div.${PREFIX}.${LINE} {
    border: 0.5px solid #419bf9;
    z-index: 1000000;
}

div.${LINE}.${SELETED} {
    border-color: #EE6723;
    z-index: 1000000;
}

/* 辅助线虚线 */
div.${LINE}.${GUIDE} {
    border: 0.5px dashed #419bf9;
    z-index: 100000;
}

div.${LINE}.${MATCH} {
    z-index: 100000;
}

/* 四个小圆点 */
div.${LINE}.${POINT} {
    position: absolute;
    width: 5px !important;
    height: 5px !important;
    background: #EE6723;
    border: 1px solid #EE6723;
    border-radius: 50%;
    z-index: 100000;
}

/* 标签 */
div.${LINE}.${SELETED}::before,
div.${LINE}.${TRICK}::before {
    position: absolute;
    display: none;
    left: 50%;
    top: -23px;
    transform: translateX(-50%);
    content: attr(data-width);
    font-size: 12px;
    color: #FFF;
    padding: 4px;
    background: #EE6723;
    border-radius: 2px;
}

div.${LINE}.${TRICK}.${VERTICAL}.${IDirection.TOP}::before,
div.${LINE}.${TRICK}.${VERTICAL}.${IDirection.BOTTOM}::before {
    content: attr(data-height);
    top: 50%;
    left: 23px;
}

div.${LINE}.${TRICK}.${IDirection.LEFT}::before,
div.${LINE}.${TRICK}.${IDirection.RIGHT}::before {
    content: attr(data-width);
}

div.${LINE}.${VERTICAL}[data-height="0px"]::before,
div.${LINE}.${HORIZONATAL}[data-width="0px"]::before {
    display: none !important;
}
`;
