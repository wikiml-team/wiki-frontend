import React, { FunctionComponent } from "react";
import { IStackStyles, Stack, useTheme } from "@fluentui/react";
import { Scrollbars } from "react-custom-scrollbars";

import FileMenu from "components/menus/homemenu/filemenu";

const MainLayout: FunctionComponent = (props) => {
  const { palette } = useTheme();
  const { children } = props;
  
  const menuStackStyles: IStackStyles = {
    root: {
      height: "100vh",
      width: 200,
      // background: palette.themeSecondary,
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

  return <React.Fragment>
      {/* <Link to="/workplace">Workplace</Link> */}
      {/* <AutoSavingForm2 /> */}

      <Stack horizontal>
        <Stack 
          verticalAlign="space-between" 
          styles={menuStackStyles}
        >
          <FileMenu />

        </Stack>
        <Stack styles={pageStackStyles}>
          <Scrollbars autoHide autoHeight autoHeightMin={100} autoHeightMax="calc(100vh - 75px)" >
            {children}
          </Scrollbars>
        </Stack>

      </Stack>
    </React.Fragment>
}

export default MainLayout;

