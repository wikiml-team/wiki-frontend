import { mergeStyleSets, useTheme } from "@fluentui/react";
import { FunctionComponent } from "react";

const ToolBar: FunctionComponent = (props) => {
  // STYLES
  const { palette } = useTheme();
  const classes = mergeStyleSets({
    root: {
      height: 94,
      padding: "4px 10px 2px 10px",
      backgroundColor: palette.neutralLighter,
      borderBottom: "1px solid #E0E0E0",
      color: palette.black,
    },
  });

  return <div className={classes.root}>{props.children}</div>;
};

export default ToolBar;