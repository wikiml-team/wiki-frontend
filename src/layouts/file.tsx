import { FunctionComponent } from "react";
import { Scrollbars } from "react-custom-scrollbars";

import { IStackStyles, Stack, useTheme } from "@fluentui/react";

import FileMenu from "components/menus/filenav";

const FileLayout: FunctionComponent = (props) => {

  const { children } = props;

  const { palette } = useTheme();
  const menuStackStyles: IStackStyles = {
    root: {
      height: "100vh",
      width: 200,
    },
  };

  const pageStackStyles: IStackStyles = {
    root: {
      height: "100vh",
      width: "100%",
      padding: 40,
      background: palette.neutralLight,
    },
  };

  return (
    <Stack horizontal>
      <Stack styles={menuStackStyles} >
        <FileMenu />
      </Stack>

      <Stack styles={pageStackStyles}>
        <Scrollbars autoHide autoHeight autoHeightMin={100} autoHeightMax="calc(100vh - 75px)" >
          {children}
        </Scrollbars>
      </Stack>

    </Stack>
  )
}

export default FileLayout;

