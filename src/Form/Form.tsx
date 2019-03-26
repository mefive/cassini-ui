import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

export interface FormProps extends React.FormHTMLAttributes<any> {
  useNative?: boolean;
}

class Form extends React.PureComponent<FormProps> {
  static defaultProps = {
    useNative: true,
    autoComplete: 'off',
  };

  render() {
    const { useNative } = this.props;

    return React.cloneElement(
      React.createElement(useNative ? 'form' : 'div'),
      {
        className: classNames(
          'form',
          this.props.className,
        ),
        autoComplete: this.props.autoComplete,
        onSubmit: useNative
          ? (e) => {
            e.preventDefault();
            if (this.props.onSubmit) {
              this.props.onSubmit(e);
            }
          }
          : null,
      },
      (
        <React.Fragment>
          <div>
            {this.props.children}
          </div>

          {useNative && (
            <input type="submit" className="d-none" />
          )}
        </React.Fragment>
      ),
    );
  }
}

const StyledForm = styled(Form)`
  .invalid-feedback {
    display: block;
    font-size: 1em;
    width: initial !important;
  }
  
  .required {
    position: relative;
    &:before {
      content: '*';
      color: ${({ theme }) => theme.red};
      font-size: 16px;
      margin-right: 0.25rem;
      vertical-align: middle;
      left: 0;
      top: 0;
    }
  }
  
  .col-form-label {
    &.right {
      text-align: right;
      padding-right: 15px;
    }
  } 
`;


export default StyledForm;
