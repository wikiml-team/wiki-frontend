import { FunctionComponent, useEffect, useRef } from "react";
import { animated } from "react-spring";

import {
  useTheme,
  IconButton,
  Stack,
  IStackItemProps,
  IStackProps
} from "@fluentui/react";

type ToolBarProps = {
  isFixed: boolean;
  handleClose: () => void;
  handleFix: () => void;
  transition: Function;
}

const ToolBar: FunctionComponent<ToolBarProps> = (props) => {
  const { children, isFixed, handleClose, handleFix, transition } = props;

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

  // LOGIC
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target) && !isFixed) {
          handleClose();
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, isFixed]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return transition((style: any, item: any) => item &&
    <animated.div style={style}>
      <div ref={wrapperRef}>
        <Stack {...stackProps} >
          <Stack.Item >
            {children}
          </Stack.Item>

          <Stack.Item {...stackPinProps}>
            {isFixed ?
              <IconButton iconProps={{ iconName: 'ChevronUp' }} title="Cancel" ariaLabel="Cancel" onClick={(item) => handleClose()} /> :
              <IconButton iconProps={{ iconName: 'Pin' }} title="Pin" ariaLabel="Cancel" onClick={(item) => handleFix()} />
            }
          </Stack.Item>
        </Stack>
      </div>
    </animated.div>
  )
};

export default ToolBar;
