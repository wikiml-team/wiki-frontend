import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";

import tabsConfiguration from "pages/methodologies/canadian/tabsconfiguration";
import IWorkplaceConfiguration, { tabSchemaOperations } from "models/workplace";
import { selectWorkplaceConfig } from "store/slices/workplaceslice";
import { PageContainer } from "components/styled/pagecontainer";

import CommandMenu from "components/menus/commands/";
import MainMenu from "components/menus/mainmenu";
import Footer from "components/menus/footer";

const WorkplaceLayout: FunctionComponent = (props) => {

  const tabs = tabsConfiguration;

  const { latestMenuTab, configuration }: IWorkplaceConfiguration = useSelector(selectWorkplaceConfig);
  const footertab = tabSchemaOperations.findkey(tabs, latestMenuTab);
  const selectedkey = configuration[latestMenuTab].formtab;

  return (
    <React.Fragment>
      <CommandMenu />
      <MainMenu tabs={tabs} />
      
      <PageContainer>
        {configuration[latestMenuTab].render}
      </PageContainer>

      <Footer tab={footertab} selectedkey={selectedkey} />
    </React.Fragment>
  );
};

export default WorkplaceLayout;
