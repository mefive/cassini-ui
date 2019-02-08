import * as React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Clickable from './Clickable';

export interface PaginationProps {
  total?: number;
  page?: number;
  totalPages?: number;
  rowsPerPage?: number;
  onChange?: (page: number) => void;
  className?: string;
}

const StyledPagination = styled.div`
 text-align: right;

  .page-item {
    margin: 0 ${({ theme }) => theme.spacers[0]};
    cursor: pointer;
    display: inline-block;
    min-width: 30px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;

    padding: 0 ${({ theme }) => theme.spacers[0]};
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.borderColor};

    &:hover {
      border-color: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.primary};
    }

    &.disabled {
      cursor: not-allowed;
      color: ${({ theme }) => theme.gray300};
      &:hover {
        border-color: ${({ theme }) => theme.borderColor};
      }
    }

    &.current {
      background-color: ${({ theme }) => theme.primary};
      color: #ffffff;
    }
  }

  span {
    display: inline-block;
    vertical-align: middle;
  
`;

class Pagination extends React.PureComponent<PaginationProps> {
  static defaultProps = {
    total: null,
    page: 1,
    totalPages: null,
    rowsPerPage: null,
    onChange: () => {},
    className: null,
  };

  getItem(page) {
    return (
      <span
        className={classNames(
          'page-item',
          { current: page === this.props.page },
        )}
        aria-hidden
        key={page}
        onClick={() => {
          if (page !== this.props.page) {
            this.props.onChange(page);
          }
        }}
      >
        {page}
      </span>
    );
  }

  render() {
    let { totalPages } = this.props;

    if (totalPages != null) {
      if (totalPages === 1) {
        return null;
      }
    } else if (this.props.rowsPerPage != null && this.props.total < this.props.rowsPerPage) {
      return null;
    }

    const isFirstPage = this.props.page === 1;

    if (totalPages == null) {
      totalPages = Math.ceil(this.props.total / this.props.rowsPerPage);
    }

    const isLastPage = (this.props.page === totalPages);

    return (
      <StyledPagination
        className={classNames(
          'justify-content-end',
          this.props.className,
        )}
      >
        <Clickable
          onClick={() => {
            if (!isFirstPage) {
              this.props.onChange(this.props.page - 1);
            }
          }}
        >
          <div
            className={classNames(
              'page-item',
              { disabled: isFirstPage },
            )}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
        </Clickable>

        <span>
          {(() => {
            const pageItems = [];

            if (totalPages < 10) {
              for (let i = 1; i <= totalPages; i += 1) {
                pageItems.push(this.getItem(i));
              }

              return pageItems;
            }

            if (this.props.page < 4) {
              for (let i = 1; i <= 5; i += 1) {
                pageItems.push(this.getItem(i));
              }

              pageItems.push(<span className="ellipsis" key="ellipsis"> ... </span>);
              pageItems.push(this.getItem(totalPages));

              return pageItems;
            }

            if (this.props.page > totalPages - 4) {
              pageItems.push(this.getItem(1));
              pageItems.push(<span className="ellipsis" key="ellipsis"> ... </span>);

              for (let i = totalPages - 4; i <= totalPages; i += 1) {
                pageItems.push(this.getItem(i));
              }

              return pageItems;
            }

            pageItems.push(this.getItem(1));
            pageItems.push(<span className="ellipsis" key="ellipsis1"> ... </span>);

            for (let i = this.props.page - 2; i <= this.props.page + 2; i += 1) {
              pageItems.push(this.getItem(i));
            }

            pageItems.push(<span className="ellipsis" key="ellipsis2"> ... </span>);
            pageItems.push(this.getItem(totalPages));

            return pageItems;
          })()}
        </span>

        <Clickable
          onClick={() => {
            if (!isLastPage) {
              this.props.onChange(this.props.page + 1);
            }
          }}
        >
          <div
            className={classNames(
              'page-item',
              { disabled: isLastPage },
            )}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </Clickable>
      </StyledPagination>
    );
  }
}

export default Pagination;
