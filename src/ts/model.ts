export interface IObject {
  [key: string]: string | number | boolean;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IPos {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width?: number;
  height?: number;
  point?: IPoint;
}

export interface Color {
  hoverColor: string;
  selectedColor: string;
  fontColor: string;
}
