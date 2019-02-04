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
  checkbox?: (checked: boolean) => JSX.Element;
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
    const { checkbox } = this.props;

    return (
      <StyledCheckbox>
        <label
          htmlFor={this.id}
        >
          {checkbox != null && checkbox(this.props.checked)}

          <input
            {...this.props}
            type="checkbox"
            id={this.id}
            hidden={checkbox != null}
          />

          {this.props.label}
        </label>
      </StyledCheckbox>
    );
  }
}

export default Checkbox;
