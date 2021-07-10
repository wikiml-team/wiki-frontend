import {
  useTheme,
  IconButton,
  BaseButton,
  Stack,
  IStackItemProps,
  IStackProps
} from "@fluentui/react";
import { FunctionComponent, MouseEventHandler } from "react";
import { animated } from "react-spring";

type ToolBarProps = {
  isFixed: boolean;
  handleOnClose: MouseEventHandler<BaseButton>;
  handleOnFix: MouseEventHandler<BaseButton>;
  transition: Function;
}

const ToolBar: FunctionComponent<ToolBarProps> = (props) => {
  const { children, isFixed, handleOnClose, handleOnFix, transition } = props;

  // STYLES
  const { palette } = useTheme();

  const stackProps: IStackProps = {
    horizontal: true,
    horizontalAlign: "space-between",
    styles: {
      root: {
        height: 94,
        padding: "0 10px 2px 10px",
        backgroundColor: palette.neutralLighter,
        borderBottom: "1px solid #E0E0E0",
        color: palette.black,
      }
    }
  };

  const stackPinProps: IStackItemProps = {
    align: "end"
  };

  return transition((style: any, item: any) => item &&
    <animated.div style={style}>
      <Stack {...stackProps}>
        <Stack.Item >
          {children}
        </Stack.Item>

        <Stack.Item {...stackPinProps}>
          {isFixed ?
            <IconButton iconProps={{ iconName: 'ChevronUp' }} title="Cancel" ariaLabel="Cancel" onClick={handleOnClose} /> :
            <IconButton iconProps={{ iconName: 'Pin' }} title="Pin" ariaLabel="Cancel" onClick={handleOnFix} />
          }
        </Stack.Item>
      </Stack>
    </animated.div>
  )
};

export default ToolBar;
