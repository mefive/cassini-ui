import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { CustomSelectContext } from './context';

const StyledCustomSelect = styled.div`
  height: auto;
  &.custom-indicator {
    background: none;
    padding-right: ${props => props.theme.customSelectPaddingX};
  }
`;

type Props = {
  indicator?: React.ReactNode;
  active?: boolean;
};

class CustomSelect extends React.PureComponent<Props & React.HTMLAttributes<any>> {
  static defaultProps = {
    indicator: null,
    active: false,
  };

  public node:Element = null;

  render() {
    const { children } = this.props;

    return (
      <CustomSelectContext.Consumer>
        {(context) => {
          const indicator = this.props.indicator || context.indicator;

          return (
            <StyledCustomSelect
              {...this.props}
              className={classNames(
                'custom-select',
                this.props.className,
                { active: this.props.active },
                { 'custom-indicator': indicator != null },
              )}
              ref={(el) => { this.node = el; }}
            >
              {indicator == null
                ? children
                : (
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="flex-grow-1">{children}</div>
                    {indicator}
                  </div>
                )}
            </StyledCustomSelect>
          );
        }}
      </CustomSelectContext.Consumer>
    );
  }
}

export default CustomSelect;
