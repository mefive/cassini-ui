import * as React from 'react';
import classNames from 'classnames';
import { isFunction } from 'lodash';
import { flattenWith } from '../utils/array';
import { Column } from './index';

export interface TableBodyProps {
  columns: Column[];
  dataSource: object[];
  rowKey: string;
  noWrap?: boolean;
}

class TableBody extends React.PureComponent<TableBodyProps> {
  static defaultProps = {
    dataSource: null,
    rowKey: null,
    noWrap: false,
  };

  getLeafColumns(): Column[] {
    const { columns } = this.props;

    const flattenColumns = flattenWith(columns, (col, parentCol, level) => ({
      level,
      ...col,
    }), 'children');

    return flattenColumns.filter(col => col.children == null);
  }

  renderCell(col: Column, row: object, rowIndex: number): JSX.Element {
    const cell = col.render == null
      ? row[col.key]
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
        key={col.key}
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
          <tr key={rowKey === null ? index : row[rowKey]}>
            {columns.map(col => this.renderCell(col, row, index))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
