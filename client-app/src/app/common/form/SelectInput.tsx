import { FC } from 'react';
import { useField } from 'formik';
import { Form, Label, Select } from 'semantic-ui-react';

interface SelectInputProps {
  placeholder: string;
  name: string;
  options: { text: string; value: string }[];
  label?: string;
}

const SelectInput: FC<SelectInputProps> = ({
  placeholder,
  name,
  options,
  label,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      {label && <label>{label}</label>}
      <Select
        options={options}
        clearable
        value={field.value}
        onChange={(_, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={placeholder}
      />
      {meta.touched && !!meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default SelectInput;
