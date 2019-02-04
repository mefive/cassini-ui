import * as React from 'react';
import { uniqueId } from 'lodash';
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

interface CheckboxProps extends React.InputHTMLAttributes<any> {
  label?: string;
  icon?: (checked: boolean) => JSX.Element;
}

class Checkbox extends React.PureComponent<CheckboxProps> {
  static defaultProps = {
    checkbox: null,
  };

  private readonly id: string = null;

  constructor(props) {
    super(props);
    this.id = `${uniqueId()}`;
  }

  render() {
    const { icon } = this.props;

    return (
      <StyledCheckbox>
        <label
          htmlFor={this.id}
        >
          {icon != null && icon(this.props.checked)}

          <input
            {...this.props}
            type="checkbox"
            id={this.id}
            hidden={icon != null}
          />

          {this.props.label}
        </label>
      </StyledCheckbox>
    );
  }
}

export default Checkbox;
