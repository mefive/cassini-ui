import * as React from 'react';
import { groupBy } from 'lodash';
import classNames from 'classnames';
import memoize from 'memoize-one';
import { Column } from './index';

export interface TableHeaderProps {
  columns: Column[];
  columnsWidth?: { [s: string]: number };
  noWrap?: boolean;
  renderColumn?: (col: Column, index: number) => JSX.Element;
}

interface FlattenColumn extends Column {
  level?: number;
  paths?: string[];
}

class TableHeader extends React.PureComponent<TableHeaderProps> {
  static defaultProps = {
    columnsWidth: {},
    noWrap: false,
  };

  private getFlattenColumns: (cols: FlattenColumn[]) => FlattenColumn[] = memoize(
    (columns: FlattenColumn[]) => columns.reduce(
      (p, c) => [...p, ...this.buildFlattenColumns(c, [], 1, [])],
      [],
    ),
  );

  buildFlattenColumns(
    col: FlattenColumn,
    cols: FlattenColumn[],
    level: number,
    paths: string[],
  ): FlattenColumn[] {
    const column: FlattenColumn = {
      ...col,
      level,
      paths: [...paths, col.key],
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
          [...paths, col.key],
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
    ) as { [s: string]: FlattenColumn[] };
    const max = Object.keys(levelGroupedColumns).length;

    return (
      <thead>
        {Object.keys(levelGroupedColumns).map((level) => {
          const columns = levelGroupedColumns[level];

          return (
            <tr key={level}>
              {columns.map((col, colIndex) => (
                <th
                  key={col.key}
                  scope="col"
                  style={{
                    minWidth: columnsWidth[col.key] || col.minWidth,
                  }}
                  colSpan={col.children
                    ? flattenColumns.filter(
                      c => c.children == null && c.paths[+level - 1] === col.key,
                    ).length
                    : null}
                  rowSpan={col.children ? null : (max - +level) + 1}
                  data-key={col.key}
                  className={classNames(
                    { 'text-nowrap': noWrap || col.noWrap },
                    { [`text-${col.align}`]: col.align },
                  )}
                >
                  {this.props.renderColumn(col, colIndex)}
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
