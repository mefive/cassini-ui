import * as React from 'react';
import Form, {
  FormItem, FormProps, withForm, WithFormProps,
} from '../../src/Form';
import { ColProps } from '../../src/Grid';
import Input from '../../src/Input';
import Checkbox from '../../src/Checkbox';
import Radio, { RadioGroup } from '../../src/Radio';
import { User } from './index';
import SvgCheckSquare from './TheForm';
import SvgSquare from '../../src/icons/solid/Square';

const labelCol: ColProps = {
  span: 3,
};

const wrapperCol: ColProps = {
  span: 9,
};

export interface UserFormProps extends WithFormProps<User> {}

@withForm
class UserForm extends React.PureComponent<UserFormProps> {
  render() {
    const { getFieldDecorator } = this.props;

    return (
      <Form>
        <FormItem
          label="Name"
          labelCol={labelCol}
          controlCol={wrapperCol}
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
          controlCol={{
            ...wrapperCol,
            offset: labelCol.span,
          }}
        >
          {getFieldDecorator('remember')((
            <Checkbox
              icon={checked => (
                <div className="mr-0">
                  {checked
                    ? (<SvgCheckSquare />)
                    : (<SvgSquare />)
                  }
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
          controlCol={wrapperCol}
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

export default UserForm;
