import { mergeStyleSets, useTheme, IconButton, BaseButton, Stack, IStackItemStyles, IStackItemProps, IStackProps } from "@fluentui/react";
import { FunctionComponent, MouseEventHandler } from "react";

type ToolBarProps = {
  isFixed: boolean;
  handleOnClose: MouseEventHandler<BaseButton>;
  handleOnFix: MouseEventHandler<BaseButton>;
}

const ToolBar: FunctionComponent<ToolBarProps> = (props) => {
  // STYLES
  const { palette } = useTheme();

  const stackProps: IStackProps = {
    horizontal: true,
    horizontalAlign: "space-between",
    styles: {
      root: {
        height: 94,
        padding: "4px 10px 2px 10px",
        backgroundColor: palette.neutralLighter,
        borderBottom: "1px solid #E0E0E0",
        color: palette.black,
      }
    }
  };

  const stackPinProps: IStackItemProps = {
    align: "end"
  };

  const { children, isFixed, handleOnClose, handleOnFix } = props;

  return <Stack {...stackProps}>
    <Stack.Item >
      {children}
    </Stack.Item>

    <Stack.Item {...stackPinProps}>
      {isFixed ?
        <IconButton iconProps={{ iconName: 'ChevronUp' }} title="Cancel" ariaLabel="Cancel" onClick={handleOnClose} /> :
        <IconButton iconProps={{ iconName: 'Pin' }} title="Pin" ariaLabel="Cancel" onClick={handleOnFix} />
      }
    </Stack.Item>
  </Stack>;
};

export default ToolBar;
