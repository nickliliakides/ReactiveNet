import { FC } from 'react';
import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';

interface TextAreaProps {
  placeholder: string;
  name: string;
  rows?: number;
  label?: string;
}

const TextArea: FC<TextAreaProps> = ({
  placeholder,
  name,
  rows = 3,
  label,
}) => {
  const [field, meta] = useField(name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      {label && <label>{label}</label>}
      <textarea {...field} rows={rows} placeholder={placeholder} />
      {meta.touched && !!meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default TextArea;
