import { IButtonStyles, IIconStyles } from "@fluentui/react";
import defaultTheme from "themes/default";

const palette = defaultTheme.palette;

// Icons Styles
export const whiteIconStyle: IIconStyles = { root: { color: palette.white } };
export const blackIconStyle: IIconStyles = { root: { color: palette.black } };

// Button Styles
export const blueButtonStyles: IButtonStyles = {
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

export const overflowButtonStyles: IButtonStyles = {
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

export const userButtonStyles: IButtonStyles = {
  root: {
    borderLeft: "2px solid " + palette.neutralQuaternaryAlt,
    borderWidth: "thin",
    backgroundColor: palette.themePrimary,
    color: palette.white,
  },
  rootHovered: {
    background: palette.themeSecondary,
  },
  rootPressed: {
    backgroundColor: palette.themePrimary,
  },
  iconHovered: {
    color: palette.white,
  },
  iconPressed: {
    color: palette.neutralQuaternaryAlt,
  },
  labelHovered: {
    color: palette.white,
  },
  label: {
    selectors: {
      ":active": {
        color: palette.white,
      },
    },
  },
};

export const farButtonStyles: IButtonStyles = {
  root: {
    backgroundColor: palette.themePrimary,
  },
  rootHovered: {
    backgroundColor: palette.themePrimary,
  },
  rootPressed: {
    backgroundColor: palette.themePrimary,
  },
  iconHovered: {
    color: palette.white,
  },
  iconPressed: {
    color: palette.neutralQuaternaryAlt,
  },
};
