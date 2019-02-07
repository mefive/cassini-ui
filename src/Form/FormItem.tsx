import * as React from 'react';
import classNames from 'classnames';

import { Row, Col, ColProps } from '../Grid';

interface FormItemProps {
  required?: boolean;
  label?: string;
  labelClassName?: string;
  labelAlign?: string;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}

class FormItem extends React.PureComponent<FormItemProps & React.HTMLAttributes<any>> {
  static defaultProps = {
    required: false,
    label: null,
    labelClassName: null,
    labelAlign: 'left',
    labelCol: {
      xs: {
        span: 12,
      },
    },
    wrapperCol: {
      xs: {
        span: 12,
      },
    },
  };

  getChildrenField(field) {
    const child = React.Children.only(this.props.children) as JSX.Element;
    return child.props[field];
  }

  getLabelFor() {
    return this.props.id || this.getChildrenField('id');
  }

  render() {
    const error = this.getChildrenField('error');

    return (
      <Row
        className={classNames(
          'form-group',
          this.props.className,
        )}
      >
        {this.props.label != null && (
          <Col
            {...this.props.labelCol}
            className={classNames(
              'col-form-label',
              this.props.labelClassName,
              { 'text-right pr-2': this.props.labelAlign === 'right' },
            )}
          >
            <label
              htmlFor={this.getLabelFor()}
              className={classNames({ required: this.props.required })}
            >
              {this.props.label}
            </label>
          </Col>
        )}

        <Col {...this.props.wrapperCol}>
          {this.props.children}

          {error && (
            <div className="invalid-feedback">
              {error}
            </div>
          )}
        </Col>
      </Row>
    );
  }
}

export default FormItem;
