import * as React from 'react';
import styled from 'styled-components';
import uniqueId from 'lodash-es/uniqueId';

type Value = string | string[] | number | boolean;

type Props = {
  icon?: (checked: boolean) => void;
  children?: JSX.Element | string;
  value?: Value;
  onChange?: (value: Value) => void;
};

type I = React.InputHTMLAttributes<any>;

export type RadioProps = Props & Pick<I, Exclude<keyof I, 'value' | 'onChange'>>;

const StyledRadio = styled.div`
  label {
    margin-bottom: 0;
    display: flex;
    //align-items: center;
  }
  
  input {
    margin-right: ${({ theme }) => theme.spacers[0]};
    margin-top: 0.2em;
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
    const {
      icon, children, value, ...props
    } = this.props;

    return (
      <StyledRadio>
        <label
          htmlFor={this.id}
        >
          {icon != null && icon(this.props.checked)}

          <input
            {...props}
            type="radio"
            id={this.id}
            hidden={icon != null}
            onChange={() => this.props.onChange(value)}
          />

          {children}
        </label>
      </StyledRadio>
    );
  }
}

export default Radio;
