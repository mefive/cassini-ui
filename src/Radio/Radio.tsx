import * as React from 'react';
import styled from 'styled-components';
import { uniqueId, omit } from 'lodash';
import { keys } from 'ts-transformer-keys';

type Props = {
  icon: (checked: boolean) => void;
  children?: JSX.Element | string;
};

export type RadioProps = Props & React.InputHTMLAttributes<any>;

const StyledRadio = styled.div`
  label {
    margin-bottom: 0;
    display: flex;
    align-items: center;
  }
  
  input {
    margin-right: ${({ theme }) => theme.spacers[0]};
  }
`;

class Radio extends React.PureComponent<RadioProps> {
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
    const radioKeys = keys<Props>();

    return (
      <StyledRadio>
        <label
          htmlFor={this.id}
        >
          {icon != null && icon(this.props.checked)}

          <input
            {...omit(this.props, radioKeys)}
            type="radio"
            id={this.id}
            hidden={icon != null}
          />

          {this.props.children}
        </label>
      </StyledRadio>
    );
  }
}

export default Radio;
