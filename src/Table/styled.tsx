import styled from 'styled-components';

const StyledTable = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;

  .table-responsive {
    position: relative;
    flex: 1;
  }

  .table-header-fixed {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background-color: #ffffff;

    .table {
      margin-bottom: 0;
    }
  }

  .table-column-fixed {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: white;

    .table-body-scrollable {
      overflow-y: hidden;
    }
  }

  .table-body-scrollable {
    height: 100%;
    overflow-y: auto;
  }

  thead th,
  tbody td {
    vertical-align: middle;
  }

  &.loading {
    .table-responsive {
      opacity: .5;
      filter: blur(0.5px);
      transition: opacity .2s;
    }
  }

  &.fixed-header {
    .table-body-scrollable {
      thead {
        opacity: 0;
      }
    }
  }

  .table-pagination {
    margin-top: ${({ theme }) => theme.spacers[2]}
  }
`;

export default StyledTable;
