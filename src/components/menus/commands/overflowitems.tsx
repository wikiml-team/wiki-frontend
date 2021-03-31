import { IButtonProps, ICommandBarItemProps } from "@fluentui/react";

import {
  blueButtonStyles,
  blackIconStyle,
  overflowButtonStyles,
} from "./__styles__/commandstyles";

export const overflowItems: ICommandBarItemProps[] = [
  {
    key: "new",
    text: "New project",
    onClick: () => console.log("Move to"),
    iconProps: {
      iconName: "Document",
      styles: blackIconStyle,
    },
    buttonStyles: blueButtonStyles,
  },
  {
    key: "open",
    text: "Open project",
    onClick: () => console.log("Open Project"),
    iconProps: { iconName: "OpenFolderHorizontal", styles: blackIconStyle },
    buttonStyles: blueButtonStyles,
  },
  {
    key: "Destroy",
    text: "Destroy project",
    onClick: () => console.log("Destroy project"),
    iconProps: { iconName: "PageRemove", styles: blackIconStyle },
    buttonStyles: blueButtonStyles,
  },
  {
    key: "Duplicate",
    text: "Duplicate project",
    onClick: () => console.log("Duplicate project"),
    iconProps: { iconName: "Documentation", styles: blackIconStyle },
    buttonStyles: blueButtonStyles,
  },
  {
    key: "Print",
    text: "Print project",
    onClick: () => console.log("Print project"),
    iconProps: { iconName: "Print", styles: blackIconStyle },
    buttonStyles: blueButtonStyles,
  },
];

// Buttons Props
export const overflowProps: IButtonProps = {
  ariaLabel: "More commands",
  styles: overflowButtonStyles,
};
