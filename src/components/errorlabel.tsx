import { Icon, ITextFieldProps, Label, TooltipHost } from "@fluentui/react";


export function ErrorLabelRender(props: ITextFieldProps) {
  return (
    <TooltipHost content={props["aria-errormessage"]}>
      <Label id={props.id}>{props.label} {" "}
        <Icon iconName="Error" aria-label="info" />
      </Label>
    </TooltipHost>
  );
}
