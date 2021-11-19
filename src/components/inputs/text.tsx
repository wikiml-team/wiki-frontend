import { TextField } from "@fluentui/react";

const TextFieldInput = ({ field, form, ...props }: any) => {
  const handleGetError = (value: string) => {
    return form.touched && form.errors ? form.errors[field.name] : "";
  };

  return (
    <TextField
      {...field}
      {...props}
      onGetErrorMessage={handleGetError}
      deferredValidationTime={500}
    />
  );
};

export default TextFieldInput;
