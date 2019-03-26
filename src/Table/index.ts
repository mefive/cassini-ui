export type Column<T = any> = {
  id?: string | number;
  key?: string & keyof T;
  title?: string;
  width?: number;
  minWidth?: number;
  align?: string;
  children?: Column<T>[];
  noWrap?: boolean;
  render?: (row: T, rowIndex: number) => JSX.Element | string;
  wrapper?: (row: T, rowIndex: number) => JSX.Element | JSX.Element;
  fixed?: boolean;
};

export { default } from './Table';
