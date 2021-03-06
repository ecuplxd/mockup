import { IObject } from './model';
import { DIV } from './const';

export const getType = (typeName: string) => {
  const toString = Object.prototype.toString;
  return (obj: any): boolean => toString.call(obj) === `[object ${typeName}]`;
};

export const cacheProps = (name: string) => {
  return (el: any, attrs: IObject | String): HTMLElement => {
    const oldAttr = el[name] || el.getAttribute(name);
    if (isString(oldAttr)) {
      el.setAttribute(name, attrs as string);
    } else if (isFunction(oldAttr)) {
      iteratorObj(attrs as IObject, (key: string, value: any) =>
        el[name](key, value)
      );
    } else {
      iteratorObj(attrs as IObject, null, oldAttr);
    }
    return el as HTMLElement;
  };
};

const isString = getType('String');
const isFunction = getType('Function');
const isNumber = getType('Number');

export const setStyle = cacheProps('style');
export const setAttribute = cacheProps('setAttribute');

export const cloneObj = (obj: IObject) => {
  if (obj) {
    return JSON.parse(JSON.stringify(obj));
  }
};

export const pass = () => {};

const iteratorObj = (object: IObject, cb: Function = pass, init?: IObject) => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const element = object[key];
      let result = cb && cb.call(null, key, element);
      if (init) {
        if (result) {
          init[result.key] = result.value;
        } else {
          init[key] = element;
        }
      }
    }
  }
  return init;
};

export const toFixed = (num: number, len = 2) => {
  return parseFloat(num.toFixed(len));
};

export const toDataAttr = (obj: IObject) => {
  return iteratorObj(
    obj,
    (key: string, value: any) => {
      let _value = isNumber(value) ? `${toFixed(value)}px` : value;
      return {
        key: `data-${key}`,
        value: `${_value}`,
      };
    },
    {}
  );
};

export const createEl = (
  elName: string = DIV,
  attrs: any = {},
  append = true
) => {
  const el = document.createElement(elName);
  const style = cloneObj(attrs.style);
  delete attrs.style;
  setAttribute(el, attrs);
  if (style) {
    setStyle(el, style as IObject);
  }
  append && document.body.appendChild(el);
  return el;
};

export const removeEl = (selector: string) => {
  const els = document.querySelectorAll(selector);
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    document.body.removeChild(el);
  }
};

export const getElDocumentPos = (el: HTMLElement) => {
  if (!el) {
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    };
  }
  const box = el.getBoundingClientRect();
  const w = box.width || box.right - box.left;
  const h = box.height || box.bottom - box.top;
  return {
    left: box.left,
    top: box.top,
    right: box.left + w,
    bottom: box.top + h,
  };
};
