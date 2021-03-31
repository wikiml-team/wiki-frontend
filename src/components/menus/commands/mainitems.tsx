import { ICommandBarItemProps } from "@fluentui/react";

import { blueButtonStyles, whiteIconStyle } from "./__styles__/commandstyles";

// Items of the command bar
export const mainItems: ICommandBarItemProps[] = [
  {
    key: "goback",
    iconProps: { iconName: "Undo", styles: whiteIconStyle },
    ariaLabel: "Undo",
    styles: { root: { backgroundColor: "#2b579a" } },
    buttonStyles: blueButtonStyles,
  },
  {
    key: "goforward",
    iconProps: { iconName: "Redo", styles: whiteIconStyle },
    ariaLabel: "Redo",
    buttonStyles: blueButtonStyles,
  },
  {
    key: "share",
    iconProps: { iconName: "Share", styles: whiteIconStyle },
    ariaLabel: "Share with someone",
    onClick: () => console.log("Share"),
    buttonStyles: blueButtonStyles,
  },
  {
    key: "export",
    iconProps: { iconName: "Export", styles: whiteIconStyle },
    ariaLabel: "Export to pdf",
    onClick: () => console.log("Export"),
    buttonStyles: blueButtonStyles,
  },
];
