import { IButtonStyles, IIconStyles } from "@fluentui/react";

// Icons Styles
export const whiteIconStyle: IIconStyles = { root: { color: "white" } };
export const blackIconStyle: IIconStyles = { root: { color: "black" } };

// Button Styles
export const blueButtonStyles: IButtonStyles = {
  root: {
    backgroundColor: "#2b579a",
  },
  rootHovered: {
    backgroundColor: "#004173",
  },
  rootPressed: {
    backgroundColor: "#00345c",
  },
  iconHovered: {
    color: "white",
  },
  iconPressed: {
    color: "white",
  },
};

export const userButtonStyles: IButtonStyles = {
  root: {
    borderLeft: "2px solid rgb(220, 220, 220, 0.4)",
    borderWidth: "thin",
    backgroundColor: "#2b579a",
    color: "white",
  },
  rootHovered: {
    background: "#2e599f",
  },
  rootPressed: {
    backgroundColor: "#2b579a",
  },
  iconHovered: {
    color: "white",
  },
  iconPressed: {
    color: "#E8E8E8",
  },
  labelHovered: {
    color: "white",
  },
  label: {
    selectors: {
      ":active": {
        color: "white",
      },
    },
  },
};

export const farButtonStyles: IButtonStyles = {
  root: {
    backgroundColor: "#2b579a",
  },
  rootHovered: {
    backgroundColor: "#2b579a",
  },
  rootPressed: {
    backgroundColor: "#2b579a",
  },
  iconHovered: {
    color: "white",
  },
  iconPressed: {
    color: "#E8E8E8",
  },
};
