import { FC, HTMLProps } from 'react';
import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';

interface TextInputProps extends HTMLProps<HTMLInputElement> {
  name: string;
  label?: string;
}

const TextInput: FC<TextInputProps> = ({ name, label, ...rest }) => {
  const [field, meta] = useField(name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      {label && <label>{label}</label>}
      <input {...field} {...rest} />
      {meta.touched && !!meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default TextInput;
