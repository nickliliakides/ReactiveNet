import { FC } from 'react';
import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';
import DatePicker, { DatePickerProps } from 'react-datepicker';

const DateInput: FC<Partial<DatePickerProps>> = (props) => {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        showIcon
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        // @ts-expect-error ts complains but everything is working
        onChange={(date: Date) => helpers.setValue(date)}
        showTimeSelect
        timeCaption='time'
        dateFormat='MMMM d, yyyy h:mm aa'
      />
      {meta.touched && !!meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default DateInput;
