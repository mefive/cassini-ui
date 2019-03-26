import styled from 'styled-components';

export const StyledSwitcher = styled.div`
  display: flex;
  align-items: center;
  
  .switcher-action {
    padding: ${0.5 * (30 - 16)}px ${0.5 * (30 - 8)}px;
    line-height: 1;
    position: relative;
    
    &:after {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
    
    &:hover {
      background-color: ${({ theme }) => theme.gray300};
      border-radius: ${({ theme }) => theme.borderRadiusSm};
    }
  }
  
  .switcher-year {
    flex: 1;
    font-weight: bold;
    text-align: center;
  }
`;

export const StyledCalendar = styled.div`
  .date-table {
    width: 100%;
    min-height: 220px;
    
    thead td,
    .date {
      width: 30px;
      height: 30px;
      text-align: center;
    }

    thead td {
      font-weight: bold;
    }
  }

  .date,
  .month {
    text-align: center;
    transition: background-color, color .2s;
    font-size: ${({ theme }) => theme.fontSizeSm};
    
    &.enable {
      &:hover {
        background-color: ${({ theme }) => theme.gray300};
        border-radius: ${({ theme }) => theme.borderRadiusSm};
      }
      cursor: pointer;
    }

    &.current {
      background-color: ${({ theme }) => theme.primary};
      color: #ffffff;
      border-radius: ${({ theme }) => theme.borderRadiusSm};
      &:hover {
        background-color: ${({ theme }) => theme.primary} !important;
      }
    }

    &.disable {
      color: ${({ theme }) => theme.gray300};
      cursor: not-allowed;
    }
  }
  
  .month-panel {
    margin-top: 10px;
  }
  
  .month {
    padding: 10px;
  }
`;
