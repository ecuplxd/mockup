const FUCI = 'zui';
const ZUIMENG = `__${FUCI}meng__`;
const ZUIKEAI = `__${FUCI}keai__`;
const ZUIGUAI = `__${FUCI}guai__`;
const SUFFIX = `__${Math.random().toString(36).substr(2)}__`;

export const PREFIX = '__ecuplxd__';
export const CTRL_KEYCODE = 'CONTROL';
export const P_KEYCODE = 'P';

export const PAUSED = 'paused' + SUFFIX;

export const MOUSEMOVE = 'mousemove';
export const KEYUP = 'keyup';
export const RESIZE = 'resize';
export const SCROLL = 'scroll';
export const CLICK = 'click';

export const LINE = ZUIMENG + 'line' + SUFFIX;
export const TRICK = ZUIMENG + 'trick' + SUFFIX;
export const POINT = ZUIMENG + 'point' + SUFFIX;

export const VERTICAL = ZUIKEAI + 'vertical' + SUFFIX;
export const HORIZONATAL = ZUIKEAI + 'horizonatal' + SUFFIX;
export const HEIGHT_NOT_ENOUGH = ZUIKEAI + 'height-not-enough' + SUFFIX;
export const WIDTH_NOT_ENOUGH = ZUIKEAI + 'width-not-enough' + SUFFIX;

export const HASDIFF = ZUIGUAI + 'has-diff' + SUFFIX;
export const HASSELETED = ZUIGUAI + 'has-seleted' + SUFFIX;
export const MATCH = ZUIGUAI + 'match' + SUFFIX;
export const GUIDE = ZUIGUAI + 'guide' + SUFFIX;
export const SELETED = ZUIGUAI + 'seleted' + SUFFIX;

export const WIDTH = 'Width';
export const HEIGHT = 'Height';

export const DIV = 'div';
export const STYLE = 'style';

export const EMPTYSTRING = '';

export const enum IDirection {
  TOP = 'd-t',
  RIGHT = 'd-r',
  BOTTOM = 'd-b',
  LEFT = 'd-l',
  TOPLEFT = 'd-tl',
  TOPRIGHT = 'd-tr',
  BOTTOMLEFT = 'd-bl',
  BOTTOMRIGH = 'd-br',
}
