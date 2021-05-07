import { TextField } from "@fluentui/react";

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
