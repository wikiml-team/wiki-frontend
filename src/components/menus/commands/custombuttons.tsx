import {
  CommandBarButton,
  concatStyleSets,
  FontSizes,
  IButtonProps,
  IContextualMenuItemStyles,
  useTheme,
} from "@fluentui/react";

export function CustomBarButton(props: IButtonProps) {
  const { palette } = useTheme();

  const itemStyles: IContextualMenuItemStyles = {
    root: {
      backgroundColor: palette.themePrimary,
    },
    rootHovered: {
      backgroundColor: palette.themeDark,
    },
    rootPressed: {
      backgroundColor: palette.themeDarker,
    },
    icon: {
      color: palette.white,
    },
    iconHovered: {
      color: palette.white,
    },
    iconPressed: {
      color: palette.white,
    },
    label: {
      color: palette.white,
    },
    labelHovered: {
      color: palette.white,
    },
  };

  return (
    <CommandBarButton
      {...props}
      styles={concatStyleSets(props.styles, itemStyles)}
    />
  );
}

export function CustomOverflowButton(props: IButtonProps) {
  const { palette } = useTheme();

  const itemStyles: IContextualMenuItemStyles = {
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
      fontSize: FontSizes.medium,
    },
  };

  return (
    <CommandBarButton
      {...props}
      styles={concatStyleSets(props.styles, itemStyles)}
    />
  );
}