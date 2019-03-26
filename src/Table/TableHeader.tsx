import * as React from 'react';
import groupBy from 'lodash-es/groupBy';
import classNames from 'classnames';
import memoize from 'memoize-one';
import { Column } from './index';

export interface TableHeaderProps<T = any> {
  columns: Column<T>[];
  columnsWidth?: { [s: string]: number };
  noWrap?: boolean;
  renderColumn?: (col: Column<T>, index: number) => JSX.Element;
}

interface FlattenColumn<T> extends Column<T> {
  level?: number;
  paths?: string[];
}

class TableHeader<T = any> extends React.PureComponent<TableHeaderProps<T>> {
  static defaultProps = {
    columnsWidth: {},
    noWrap: false,
  };

  private getFlattenColumns: (cols: FlattenColumn<T>[]) => FlattenColumn<T>[] = memoize(
    (columns: FlattenColumn<T>[]) => columns.reduce(
      (p, c) => [...p, ...this.buildFlattenColumns(c, [], 1, [])],
      [],
    ),
  );

  private static getKey(col: Column): string {
    return col.key || `${col.id}`;
  }

  buildFlattenColumns(
    col: FlattenColumn<T>,
    cols: FlattenColumn<T>[],
    level: number,
    paths: string[],
  ): FlattenColumn<T>[] {
    const column: FlattenColumn<T> = {
      ...col,
      level,
      paths: [...paths, TableHeader.getKey(col)],
    };

    return [
      ...cols,
      column,
      ...(col.children || []).reduce((p, c) => [
        ...p,
        ...this.buildFlattenColumns(
          c,
          cols,
          level + 1,
          [...paths, TableHeader.getKey(col)],
        ),
      ], []),
    ];
  }

  render() {
    const { columnsWidth, noWrap } = this.props;
    const flattenColumns = this.getFlattenColumns(this.props.columns);
    const levelGroupedColumns = groupBy(
      flattenColumns,
      ({ level }) => level,
    ) as { [s: string]: FlattenColumn<T>[] };
    const max = Object.keys(levelGroupedColumns).length;

    return (
      <thead>
        {Object.keys(levelGroupedColumns).map((level) => {
          const columns = levelGroupedColumns[level];

          return (
            <tr key={level}>
              {columns.map((col, colIndex) => (
                <th
                  key={TableHeader.getKey(col)}
                  scope="col"
                  style={{
                    minWidth: columnsWidth[TableHeader.getKey(col)] || col.minWidth,
                  }}
                  colSpan={col.children
                    ? flattenColumns.filter(
                      c => c.children == null && c.paths[+level - 1] === TableHeader.getKey(col),
                    ).length
                    : null}
                  rowSpan={col.children ? null : (max - +level) + 1}
                  data-key={TableHeader.getKey(col)}
                  className={classNames(
                    { 'text-nowrap': noWrap || col.noWrap },
                    { [`text-${col.align}`]: col.align },
                  )}
                >
                  {this.props.renderColumn ? this.props.renderColumn(col, colIndex) : col.title}
                </th>
              ))}
            </tr>
          );
        })}
      </thead>
    );
  }
}

export default TableHeader;
