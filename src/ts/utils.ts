import { IObject } from './model';
import { HEIGHT, DIV } from './const';

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

export const toDataAttr = (obj: IObject) => {
  return iteratorObj(
    obj,
    (key: string, value: any) => {
      let _value = isNumber(value) ? `${value}px` : value;
      return {
        key: `data-${key}`,
        value: `${_value}`,
      };
    },
    {}
  );
};

export const createEl = (elName: string = DIV, attrs: any = {}) => {
  const el = document.createElement(elName);
  const style = cloneObj(attrs.style);
  delete attrs.style;
  setAttribute(el, attrs);
  if (style) {
    setStyle(el, style as IObject);
  }
  document.body.appendChild(el);
  return el;
};

export const removeEl = (selector: string) => {
  const els = document.querySelectorAll(selector);
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    document.body.removeChild(el);
  }
};

// Javascript 权威指南
export const getScrollOffsets = (w?: any) => {
  w = w || window;
  if (w.pageXOffset !== null) {
    return {
      x: w.pageXOffset,
      y: w.pageYOffset,
    };
  }
  const d = w.document;
  if (document.compatMode === 'CSS1Compat') {
    return {
      x: d.documentElement.scrollLeft,
      y: d.documentElement.scrollTop,
    };
  }

  return {
    x: d.body.scrollLeft,
    y: d.body.scrollTop,
  };
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
  const offsets = getScrollOffsets();
  return {
    left: box.left + offsets.x,
    top: box.top + offsets.y,
    // border 占了 1px
    right: box.left + offsets.x + w - 1,
    bottom: box.top + offsets.y + h - 1,
  };
};

/* 获取文档宽高 */
export const getScroll = (type: string = HEIGHT) => {
  let scroll = 0,
    bodyScroll = 0,
    documentScroll = 0;
  const { body, documentElement } = document as any;
  const callKey = `scroll${type}`;
  if (body) {
    bodyScroll = body[callKey];
  }
  if (documentElement) {
    documentScroll = documentElement[callKey];
  }
  scroll = bodyScroll - documentScroll > 0 ? bodyScroll : documentScroll;
  return scroll;
};
