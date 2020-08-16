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
  HEIGHT_NOT_ENOUGH,
  WIDTH_NOT_ENOUGH,
} from './const';

export const styles = `
body.${PREFIX}.${PAUSED} > div.${PREFIX} {
  display: none;
}

body.${HASDIFF} div.${LINE}.${TRICK}::before {
  display: block;
}

body.${HASSELETED} div.${LINE}.${VERTICAL}.${SELETED}.${IDirection.RIGHT}::before {
  content: attr(data-height);
  top: calc(50% - 8.5px);
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
  position: fixed;
}

/* line */
div.${PREFIX}.${LINE} {
  border: 0.5px solid #419bf9;
  z-index: 1000000;
}

div.${LINE}.${SELETED} {
  border-color: #EE6723;
  z-index: 1000000;
}

/* guide line */
div.${LINE}.${GUIDE} {
  border: 0.5px dashed #419bf9;
  z-index: 100000;
}

div.${LINE}.${MATCH} {
  z-index: 100000;
}

/* 4 dot */
div.${LINE}.${POINT} {
  position: absolute;
  width: 4px !important;
  height: 4px !important;
  background: #EE6723;
  border: 1px solid #EE6723;
  z-index: 100000;
  display: none;
}

/* width/height label */
div.${LINE}.${SELETED}::before,
div.${LINE}.${TRICK}::before {
  position: absolute;
  display: none;
  left: 50%;
  top: -20px;
  transform: translateX(-50%);
  content: attr(data-width);
  font-size: 12px;
  color: #FFF;
  padding: 1px 2px;
  background: #EE6723;
  border-radius: 2px;
}

div.${LINE}.${SELETED}.${HEIGHT_NOT_ENOUGH}::before {
  top: 4px;
}

div.${LINE}.${SELETED}.${WIDTH_NOT_ENOUGH}::before {
  left: -25px;
}

div.${LINE}.${TRICK}.${VERTICAL}.${IDirection.TOP}::before,
div.${LINE}.${TRICK}.${VERTICAL}.${IDirection.BOTTOM}::before {
  content: attr(data-height);
  top: calc(50% - 8.5px);
  left: 0;
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
