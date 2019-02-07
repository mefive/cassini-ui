import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import Form, { FormItem, FormProps, withForm } from '../../src/Form';
import { ColProps } from '../../src/Grid';
import Input from '../../src/Input';
import Checkbox from '../../src/Checkbox';
import Radio, { RadioGroup } from '../../src/Radio';

const labelCol: ColProps = {
  span: 3,
};

const wrapperCol: ColProps = {
  span: 9,
};

class WithForm extends React.PureComponent<FormProps> {
  render() {
    const { getFieldDecorator } = this.props;

    return (
      <Form>
        <FormItem
          label="Name"
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true,
            }],
          })((
            <Input />
          ))}
        </FormItem>

        <FormItem
          className="mt-1"
          labelCol={labelCol}
          wrapperCol={{
            ...wrapperCol,
            offset: labelCol.span,
          }}
        >
          {getFieldDecorator('remember')((
            <Checkbox
              icon={checked => (
                <div className="mr-0">
                  <FontAwesomeIcon icon={checked ? faCheckSquare : faSquare} />
                </div>
              )}
            >
              remembered
            </Checkbox>
          ))}
        </FormItem>

        <FormItem
          className="mt-1"
          label="Gender"
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        >
          {getFieldDecorator('gender')((
            <RadioGroup>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </RadioGroup>
          ))}
        </FormItem>
      </Form>
    );
  }
}

export default withForm(WithForm);
