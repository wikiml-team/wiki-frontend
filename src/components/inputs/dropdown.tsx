import { Dropdown } from "@fluentui/react";

const DropdownFieldInput = ({ field, form, ...props }: any) => {
  const handleGetError = (value: string) => {
    return form.touched && form.errors ? form.errors[field.name] : "";
  };

  return (
    <Dropdown
      {...field}
      {...props}
      onGetErrorMessage={handleGetError}
      deferredValidationTime={500}
    />
  );
};

export default DropdownFieldInput;
