import { Dropdown } from "@fluentui/react";

const DropdownFieldInput = ({ field, form, ...props }: any) => {
  const handleOnGetError = (value: string) => {
    return form.touched && form.errors ? form.errors[field.name] : "";
  };

  return (
    <Dropdown
      {...field}
      {...props}
      onGetErrorMessage={handleOnGetError}
      deferredValidationTime={500}
    />
  );
};

export default DropdownFieldInput;
