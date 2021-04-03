import {
  IButtonProps,
  IButtonStyles,
  ICommandBarItemProps,
  IIconStyles,
  IPalette,
} from "@fluentui/react";

// Items of the command bar
export const getItems = (palette: IPalette) => {
  // Icons Styles
  const whiteIconStyle: IIconStyles = { root: { color: palette.white } };
  const blackIconStyle: IIconStyles = { root: { color: palette.black } };

  // Button Styles
  const blueButtonStyles: IButtonStyles = {
    root: {
      backgroundColor: palette.themePrimary,
    },
    rootHovered: {
      backgroundColor: palette.themeDark,
    },
    rootPressed: {
      backgroundColor: palette.themeDarker,
    },
    iconHovered: {
      color: palette.white,
    },
    iconPressed: {
      color: palette.white,
    },
  };

  const overflowButtonStyles: IButtonStyles = {
    root: {
      backgroundColor: palette.themePrimary,
    },
    rootHovered: {
      backgroundColor: palette.themeDark,
    },
    rootPressed: {
      backgroundColor: palette.themeDarker,
    },
    rootExpanded: {
      backgroundColor: palette.themeDarker,
    },
    rootExpandedHovered: {
      backgroundColor: palette.themeDark,
    },
    menuIcon: {
      color: palette.white + " !important",
    },
  };

  // Buttons Props
  const overflowProps: IButtonProps = {
    ariaLabel: "More commands",
    styles: overflowButtonStyles,
  };

  const mainItems: ICommandBarItemProps[] = [
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
  ] as ICommandBarItemProps[];

  const overflowItems: ICommandBarItemProps[] = [
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

  return { mainItems, overflowItems, overflowProps };
};
