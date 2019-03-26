import * as React from 'react';
import classNames from 'classnames';

import { Row, Col, ColProps } from '../Grid';

export interface FormItemProps extends React.HTMLAttributes<any> {
  required?: boolean;
  label?: string;
  labelAlign?: string;
  labelSuffix?: string;
  labelCol?: ColProps;
  controlCol?: ColProps;
  labelWrapper?: React.ReactNode;
  controlWrapper?: React.ReactNode;
  error?: string | JSX.Element;
}

class FormItem extends React.PureComponent<FormItemProps> {
  static defaultProps = {
    required: false,
    labelAlign: 'left',
    labelSuffix: ':',
  };

  private label: HTMLElement = null;

  getChildrenField(field) {
    const child = React.Children.only(this.props.children) as JSX.Element;
    return child.props[field];
  }

  getLabelFor() {
    return this.props.id || this.getChildrenField('id');
  }

  render() {
    const error = this.props.error || this.getChildrenField('error');

    const labelWrapper = this.props.labelWrapper || (
      <Col
        {...this.props.labelCol}
        className={classNames(
          'col-form-label',
          { 'text-right pr-2': this.props.labelAlign === 'right' },
        )}
      />
    );

    const controlWrapper = this.props.controlWrapper || (
      <Col
        {...this.props.controlCol}
      />
    );

    return (
      <div
        className="form-group"
      >
        <Row className={this.props.className}>
          {this.props.label != null && React.cloneElement(labelWrapper as JSX.Element, {
            ref: (el) => { this.label = el; },
          }, (
            <label
              htmlFor={this.getLabelFor()}
              className={classNames({ required: this.props.required })}
            >
              {this.props.label}
              {this.props.labelSuffix}
            </label>
          ))}

          {React.cloneElement(controlWrapper as JSX.Element, null, (
            <React.Fragment>
              {this.props.children}
            </React.Fragment>
          ))}
        </Row>

        {error && (
          <div
            className="invalid-feedback"
            style={{
              marginLeft: this.label && this.label.offsetWidth,
            }}
          >
            {error}
          </div>
        )}
      </div>
    );
  }
}

export default FormItem;
