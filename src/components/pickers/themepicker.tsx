import React from "react";

import { IColorCellProps, mergeStyleSets, useTheme } from "@fluentui/react";

import { Circle } from "components/styled/shapes";

type SwatchThemePickerProps = {
  colorCells: IColorCellProps[];
  size: string;
  handler: (id: string) => void;
};

export default function ThemePicker(props: SwatchThemePickerProps) {
  const { colorCells, handler, size } = props;

  // STYLES
  const { palette } = useTheme();
  
  const classes = mergeStyleSets({
    circle: {
      ":hover": {
        cursor: "pointer",
        border: "solid 4px " + palette.neutralLighter,
      },
    },
  });

  return (
    <React.Fragment>
      {colorCells.map((cell) => {
        return (
          <div key={cell.id}>
            <Circle
              ariaLabel={cell.label}
              size={size}
              color={cell.color}
              border={palette.neutralQuaternaryAlt}
              onClick={() => handler(cell.label || "")}
              className={classes.circle}
            />
          </div>
        );
      })}
    </React.Fragment>
  );
}
