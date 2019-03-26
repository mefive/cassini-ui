import * as React from 'react';
import uniqueId from 'lodash-es/uniqueId';
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
  value?: boolean;
  onChange?: (value: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
};

type I = React.InputHTMLAttributes<any>;

type CheckboxProps = Props & Pick<I, Exclude<keyof I, 'value' | 'onChange'>>;

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
    const {
      icon, children, value, onChange, className, ...props
    } = this.props;

    return (
      <StyledCheckbox className={className}>
        <label
          htmlFor={this.id}
        >
          {icon != null && icon(this.props.checked)}

          <input
            {...props}
            checked={value}
            type="checkbox"
            id={this.id}
            hidden={icon != null}
            onChange={e => onChange(e.target.checked, e)}
          />

          {children}
        </label>
      </StyledCheckbox>
    );
  }
}

export default Checkbox;
