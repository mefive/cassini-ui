import * as React from 'react';
import { keys } from 'ts-transformer-keys';
import { uniqueId, omit } from 'lodash';
import styled from 'styled-components';

const StyledCheckbox = styled.div`
  label {
    margin-bottom: 0;
    display: flex;
    align-items: center;
  }
  
  input {
    margin-right: ${({ theme }) => theme.spacers[0]};
  }
`;

type Props = {
  icon?: (checked: boolean) => JSX.Element;
  children?: JSX.Element | string;
};

type CheckboxProps = Props & React.InputHTMLAttributes<any>;

class Checkbox extends React.PureComponent<CheckboxProps> {
  static defaultProps = {
    icon: null,
  };

  private readonly id: string = null;

  constructor(props) {
    super(props);
    this.id = `${uniqueId()}`;
  }

  render() {
    const { icon } = this.props;

    const checkboxKeys = keys<Props>();

    return (
      <StyledCheckbox>
        <label
          htmlFor={this.id}
        >
          {icon != null && icon(this.props.checked)}

          <input
            {...omit(this.props, checkboxKeys)}
            type="checkbox"
            id={this.id}
            hidden={icon != null}
          />

          {this.props.children}
        </label>
      </StyledCheckbox>
    );
  }
}

export default Checkbox;