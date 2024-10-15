import { FC } from 'react';
import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';

interface TextInputProps {
  placeholder: string;
  name: string;
  label?: string;
}

const TextInput: FC<TextInputProps> = ({ placeholder, name, label }) => {
  const [field, meta] = useField(name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      {label && <label>{label}</label>}
      <input {...field} placeholder={placeholder} />
      {meta.touched && !!meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default TextInput;
