export type Column = {
  key: string;
  title?: string;
  width?: number;
  minWidth?: number;
  align?: string;
  children?: Column[];
  noWrap?: boolean;
  render?: (row: object, rowIndex: number) => JSX.Element;
  wrapper?: (row: object, rowIndex: number) => JSX.Element | JSX.Element;
  fixed?: boolean;
};

export { default } from './Table';
