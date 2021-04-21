import { FontSizes, IButtonStyles, IconButton } from "@fluentui/react";

export default function OverflowButton(overflowItems: any[] | undefined) {
  const buttonStyles: Partial<IButtonStyles> = {
    root: {
      minWidth: 20,
      padding: "0 4px",
      alignSelf: "stretch",
      height: "auto",
      color: "black",
    },
    menuIcon: {
      fontSize: FontSizes.size16,
    },
  };

  return (
    <IconButton
      role="menuitem"
      title="More options"
      styles={buttonStyles}
      menuIconProps={{ iconName: "More" }}
      menuProps={{ items: overflowItems! }}
    />
  );
}
