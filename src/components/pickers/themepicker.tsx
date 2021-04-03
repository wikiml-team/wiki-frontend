import React from "react";
import { IColorCellProps, mergeStyleSets, useTheme } from "@fluentui/react";
import { Circle } from "components/styled/shapes";

type SwatchThemePickerProps = {
  colorCells: IColorCellProps[];
  size: string;
  selectedId: string;
  handler: (id: string) => void;
};

export default function ThemePicker(props: SwatchThemePickerProps) {
  const { colorCells, handler, selectedId, size } = props;

  // STYLES
  const palette = useTheme().palette;
  const classes = mergeStyleSets({
    circle: {
      selectors: {
        ":hover": {
          cursor: "pointer",
          border: "solid 4px " + palette.neutralLighter,
        },
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
              onClick={() => handler(cell.id)}
              className={classes.circle}
            />
          </div>
        );
      })}
    </React.Fragment>
  );
}
