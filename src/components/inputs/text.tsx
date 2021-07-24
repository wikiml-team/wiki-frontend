import { TextField } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

const TextFieldInput = ({ field, form, ...props }: any) => {
  const handleOnGetError = (value: string) => {
    return form.touched && form.errors ? form.errors[field.name] : "";
  };

  return (
    <TextField
      {...field}
      {...props}
      onGetErrorMessage={handleOnGetError}
      deferredValidationTime={500}
    />
  );
};

export default TextFieldInput;

const MultilineTextFieldInput = ({ field, form, ...props }: any) => {

  const [multiline, { toggle: toggleMultiline }] = useBoolean(false);
  const onChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string): void => {
    const newMultiline = newText.length > 50;
    if (newMultiline !== multiline) {
      toggleMultiline();
    }
  };

  const handleOnGetError = (value: string) => {
    return form.touched && form.errors ? form.errors[field.name] : "";
  };

  return (
    <TextField
      multiline={multiline}
      onChange={onChange}
      {...field}
      {...props}
      onGetErrorMessage={handleOnGetError}
      deferredValidationTime={500}
    />
  );
};
