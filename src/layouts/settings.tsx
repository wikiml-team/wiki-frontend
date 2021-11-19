import React, { FunctionComponent } from "react";

import SettingsMenu from "components/menus/settingsmenu";
import PageContainer from "components/styled/pagecontainer";

const SettingsLayout: FunctionComponent = (props) => {
  const { children } = props;

  return (
    <React.Fragment>
      <SettingsMenu />
      <PageContainer scrollHeight="calc(100vh - 110px)">
        {children}
      </PageContainer>
    </React.Fragment>
  );
};

export default SettingsLayout;
