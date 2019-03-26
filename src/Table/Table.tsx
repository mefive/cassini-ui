import * as React from 'react';
import classNames from 'classnames';
import query, { scrollTop } from 'dom-helpers/query';
import * as scrollLeft from 'dom-helpers/query/scrollLeft';
import classHelper from 'dom-helpers/class';
import throttle from 'lodash-es/throttle';

import Checkbox from '../Checkbox';
import Loading from '../Loading';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from '../Pagination';
import { Column } from './index';
import StyledTable from './styled';

export interface TableProps<T = any> {
  className?: string;
  caption?: string;
  columns?: Column<T>[];
  renderColumn?: (col: Column<T>) => JSX.Element;
  dataSource?: T[];
  rowKey?: keyof T;
  pagination?: {
    page?: number;
    enablePagination?: boolean;
    onChange: (page: number) => void;
    totalPages?: number;
    rowsPerPage?: number;
  };
  isLoading?: boolean;
  height?: number | string;
  noWrap?: boolean;
  rowSelection?: {
    selectedRowKeys: string[];
    onChange: (keys: string[]) => void;
  };
}

class Table<T> extends React.PureComponent<TableProps<T>> {
  static defaultProps = {
    caption: null,
    className: null,
    columns: [],
    dataSource: null,
    rowKey: null,
    pagination: null,
    isLoading: false,
    height: null,
    noWrap: false,
    renderColumn: col => col.title,
  };

  private table: HTMLDivElement = null;

  private tableHeaderFixed: HTMLDivElement = null;

  private tableContainerColumnFixed: HTMLDivElement = null;

  private tableColumnFixed: HTMLDivElement = null;

  private updateColumnsWidth = throttle(() => {
    let columnsWidth = {};

    const columns = this.table.querySelectorAll('thead th');

    [].forEach.call(columns, (column) => {
      const key = column.getAttribute('data-key');
      const width = query.width(column);

      columnsWidth = {
        ...columnsWidth,
        [key]: width,
      };
    });

    const { table } = this;

    const verticalScrollbarWidth = table.offsetWidth - table.clientWidth;

    this.setState({ columnsWidth, verticalScrollbarWidth });
  });

  state = {
    columns: [],
    columnsWidth: {},
    verticalScrollbarWidth: 0,
  };

  componentWillMount() {
    this.updateColumns();
  }

  componentDidMount() {
    if (this.props.height != null) {
      this.updateColumnsWidth();
      window.addEventListener('resize', this.updateColumnsWidth);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.columns !== this.props.columns) {
      this.updateColumns(nextProps.columns);
    }
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.height == null && this.props.height != null)
      || prevProps.dataSource !== this.props.dataSource
    ) {
      this.updateColumnsWidth();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateColumnsWidth);
  }

  onScroll = () => {
    const { tableHeaderFixed, tableContainerColumnFixed, tableColumnFixed } = this;

    const tableScrollLeft = scrollLeft(this.table);
    const tableScrollTop = scrollTop(this.table);

    if (tableHeaderFixed) {
      scrollLeft(tableHeaderFixed, tableScrollLeft);
    }

    if (tableColumnFixed) {
      scrollTop(tableColumnFixed, tableScrollTop);

      if (tableScrollLeft > 0) {
        classHelper.addClass(tableContainerColumnFixed, 'shadow');
      } else {
        classHelper.removeClass(tableContainerColumnFixed, 'shadow');
      }
    }
  };

  getPagedDataSource(dataSource) {
    if (this.props.pagination == null) {
      return dataSource;
    }

    const { page, totalPages, rowsPerPage } = this.props.pagination;

    if (totalPages != null) {
      return dataSource;
    }

    const start = (page - 1) * rowsPerPage;

    return dataSource.slice(start, start + rowsPerPage);
  }

  private renderColumn = (col: Column<T>) => {
    const { rowSelection } = this.props;

    if (rowSelection && col.id === 'selection') {
      const dataSource = this.getPagedDataSource(this.props.dataSource);

      return (
        <Checkbox
          className="d-inline-block vertical-middle"
          value={dataSource && dataSource.length > 0 && dataSource
            .every(row => rowSelection.selectedRowKeys.indexOf(row[this.props.rowKey]) !== -1)}
          onChange={(checked) => {
            if (checked) {
              rowSelection.onChange(dataSource.map(data => data[this.props.rowKey]));
            } else {
              rowSelection.onChange([]);
            }
          }}
        />
      );
    }
    return this.props.renderColumn(col);
  };


  updateColumns = (columns = this.props.columns) => {
    const fixed = [];
    const rest = [];

    columns.forEach((col) => {
      if (col.fixed) {
        fixed.push(col);
      } else {
        rest.push(col);
      }
    });

    const selectionColumn: Column[] = [];

    if (this.props.rowSelection != null) {
      selectionColumn.push({
        id: 'selection',
        align: 'center',
        render: (row) => {
          const { rowKey, rowSelection } = this.props;
          return (
            <Checkbox
              className="d-inline-block vertical-middle"
              value={rowSelection.selectedRowKeys.indexOf(row[rowKey]) !== -1}
              onChange={(checked) => {
                const selectedRowKeys: Set<string> = new Set(rowSelection.selectedRowKeys);

                if (checked) {
                  selectedRowKeys.add(row[rowKey]);
                } else {
                  selectedRowKeys.delete(row[rowKey]);
                }

                rowSelection.onChange(Array.from(selectedRowKeys));
              }}
            />
          );
        },
      });
    }

    this.setState({ columns: [...selectionColumn, ...fixed, ...rest] });
  };

  render() {
    const {
      pagination, isLoading, height, noWrap,
    } = this.props;

    const { columns, verticalScrollbarWidth } = this.state;

    let dataSource = this.props.dataSource || [];

    if (pagination != null) {
      dataSource = this.getPagedDataSource(dataSource);
    }

    const columnsFixed = columns.filter(({ fixed }) => fixed);
    const noData = !isLoading && dataSource.length === 0;

    return (
      <StyledTable
        className={classNames(
          this.props.className,
          { loading: isLoading },
          { 'no-data': noData },
          { 'fixed-header': height != null },
        )}
        style={{
          height: height === 'flex' ? '100%' : height,
        }}
      >
        <div
          className="table-responsive"
        >
          {(() => {
            const tableBodyScrollable = (
              <div
                className="table-body-scrollable"
                ref={(el) => { this.table = el; }}
                onScroll={height && this.onScroll}
              >
                <table className="table">
                  {this.props.caption != null && (
                    <caption>{this.props.caption}</caption>
                  )}

                  <TableHeader<T>
                    columns={columns}
                    noWrap={noWrap}
                    renderColumn={this.renderColumn}
                  />

                  <TableBody<T>
                    columns={columns}
                    dataSource={dataSource}
                    noWrap={noWrap}
                  />
                </table>
              </div>
            );

            if (height != null) {
              return (
                <div
                  className="position-absolute"
                  style={{
                    left: 0, right: 0, top: 0, bottom: 0,
                  }}
                >
                  {tableBodyScrollable}
                </div>
              );
            }

            return tableBodyScrollable;
          })()}

          {height != null && (
            <div
              className="table-header-fixed"
              style={{ right: verticalScrollbarWidth }}
              ref={(el) => { this.tableHeaderFixed = el; }}
            >
              <table className="table">
                <TableHeader<T>
                  columns={columns}
                  noWrap={noWrap}
                  columnsWidth={this.state.columnsWidth}
                  renderColumn={this.renderColumn}
                />
              </table>
            </div>
          )}

          {columnsFixed.length > 0 && (
            <div
              className="table-column-fixed"
              ref={(el) => { this.tableContainerColumnFixed = el; }}
            >
              <div
                className="table-body-scrollable"
                ref={(el) => { this.tableColumnFixed = el; }}
              >
                <table className="table">
                  <TableHeader<T>
                    columns={columnsFixed}
                    noWrap={noWrap}
                    renderColumn={this.renderColumn}
                  />

                  <TableBody columns={columnsFixed} dataSource={dataSource} noWrap={noWrap} />
                </table>
              </div>

              {height != null && (
                <div
                  className="table-header-fixed"
                  style={{ right: verticalScrollbarWidth }}
                >
                  <table className="table">
                    <TableHeader<T>
                      columns={columnsFixed}
                      columnsWidth={this.state.columnsWidth}
                      renderColumn={this.renderColumn}
                      noWrap={noWrap}
                    />
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {isLoading && (
          <Loading>加载中...</Loading>
        )}

        {noData && (
          <Loading>
            没有数据
          </Loading>
        )}

        {pagination != null && (
          <Pagination
            {...pagination}
            total={(this.props.dataSource || []).length}
          />
        )}
      </StyledTable>
    );
  }
}

export default Table;
