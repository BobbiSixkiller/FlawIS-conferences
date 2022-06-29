import { useField } from "formik";
import { FC } from "react";
import { Form, FormFieldProps } from "semantic-ui-react";

interface inputFieldProps extends FormFieldProps {
  name: string;
  fluid: boolean;
  placeholder?: string;
}

const InputField: FC<inputFieldProps> = (props) => {
  const [field, meta, _helpers] = useField(props.name);

  return (
    <Form.Field {...props} {...field} error={meta.touched && meta.error} />
  );
};

export default InputField;
