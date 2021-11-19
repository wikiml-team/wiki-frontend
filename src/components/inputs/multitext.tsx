import { TextField } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

const MultilineTextFieldInput = ({ field, form, ...props }: any) => {
  // LOGIC
  const [multiline, { toggle: toggleMultiline }] = useBoolean(false);

  const onChange = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newText: string
  ): void => {
    const newMultiline = newText.length > 50;
    if (newMultiline !== multiline) {
      toggleMultiline();
    }
  };

  const handleGetError = (value: string) => {
    return form.touched && form.errors ? form.errors[field.name] : "";
  };

  return (
    <TextField
      multiline={multiline}
      onChange={onChange}
      {...field}
      {...props}
      onGetErrorMessage={handleGetError}
      deferredValidationTime={500}
    />
  );
};

export default MultilineTextFieldInput;
