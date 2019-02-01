import styled from 'styled-components';

const StyledPopover = styled.div`
  top: 0;
  left: 0;
  z-index: ${props => props.theme.zindexDropdown};
  
  &.bs-popover-top,
  &.bs-popover-bottom {
    .arrow {
      left: 50%;
      margin-left: calc(-0.5 * ${props => (props.theme.popoverArrowWidth)});
    }

    &.left {
      .arrow {
        left: ${props => props.theme.borderRadiusLg};
        margin-left: 0;
      }
    }

    &.right {
      .arrow {
        right: 0;
        left: auto;
        margin-left: 0;
      }
    }
  }

  &.bs-popover-left,
  &.bs-popover-right {
    .arrow {
      top: 50%;
      margin-top: calc(-0.5 * ${props => (props.theme.popoverArrowWidth)});
    }

    &.top {
      .arrow {
        top: ${props => props.theme.borderRadiusLg};
        margin-top: 0;
      }
    }

    &.bottom {
      .arrow {
        bottom: 0;
        top: auto;
        margin-top: 0;
      }
    }
  }
`;

export default StyledPopover;
