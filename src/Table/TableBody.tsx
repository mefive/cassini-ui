import * as React from 'react';
import classNames from 'classnames';
import isFunction from 'lodash-es/isFunction';
import { flattenWith } from '../utils/array';
import { Column } from './index';

export interface TableBodyProps<T> {
  columns: Column<T>[];
  dataSource: T[];
  rowKey: keyof T;
  noWrap?: boolean;
}

class TableBody<T = any> extends React.PureComponent<TableBodyProps<T>> {
  static defaultProps = {
    dataSource: null,
    rowKey: null,
    noWrap: false,
  };

  getLeafColumns(): Column<T>[] {
    const { columns } = this.props;

    const flattenColumns = flattenWith(columns, (col, parentCol, level) => ({
      level,
      ...col,
    }), 'children');

    return flattenColumns.filter(col => col.children == null);
  }

  private static getKey(col: Column): string {
    return col.key || `${col.id}`;
  }

  renderCell(col: Column<T>, row: T, rowIndex: number): JSX.Element {
    const cell = col.render == null
      ? row[TableBody.getKey(col)]
      : col.render(row, rowIndex);

    if (col.wrapper != null) {
      const wrapper = isFunction(col.wrapper) ? col.wrapper(row, rowIndex) : col.wrapper;

      return wrapper && React.cloneElement(
        wrapper,
        null,
        cell,
      );
    }

    return (
      <td
        key={TableBody.getKey(col)}
        className={classNames(
          { 'text-nowrap': this.props.noWrap || col.noWrap },
          { [`text-${col.align}`]: col.align },
        )}
      >
        {cell}
      </td>
    );
  }

  render() {
    const { dataSource, rowKey } = this.props;
    const columns = this.getLeafColumns();

    if (dataSource == null) {
      return null;
    }

    return (
      <tbody>
        {dataSource.map((row, index) => (
          <tr key={`${rowKey === null ? index : row[rowKey]}`}>
            {columns.map(col => this.renderCell(col, row, index))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
