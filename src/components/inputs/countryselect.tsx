
import { Dropdown, IDropdownOption, Stack } from "@fluentui/react";
//import { getEmojiFlag, getUnicode } from "countries-list";
import { toNumber } from "lodash";
import React from "react";

const Emoji = (props : {label: string, symbol: string}) => (
  <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
  >
    {/* {props.symbol} */}
    {/* {String.fromCodePoint(0x1F1E6-0x1F1EA)} */}
    
    {String.fromCodePoint(0x1F1E6-0x1F1EA)}
    {/* <span>{'\u{1f600}'}</span> */}
      {/* {String.fromCodePoint(toNumber(props.symbol))} */}
  </span>
);

const CountryDropdownFieldInput = ({ field, form, ...props }: any) => {
    const handleGetError = (value: string) => {
      return form.touched && form.errors ? form.errors[field.name] : "";
    };

    const onRenderOption = (option: IDropdownOption): JSX.Element => {
        return (
          <Stack horizontal>
            <Emoji symbol={option.text} label={option.text}/>
            <span>{option.text}</span>
          </Stack>
        );
      };
  
    return (
      <Dropdown
        {...field}
        {...props}
        defaultSelectedKey={field.value}
        onGetErrorMessage={handleGetError}
        deferredValidationTime={500}
        onRenderOption={onRenderOption}
      />
    );
  };
  
  export default CountryDropdownFieldInput;