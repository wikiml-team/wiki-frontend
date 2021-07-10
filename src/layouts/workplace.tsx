import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { mergeStyleSets } from "@fluentui/react";

import tabsConfiguration from "pages/methodologies/canadian/tabsconfiguration";
import IWorkplaceConfiguration, { tabSchemaOperations } from "models/workplace";
import { selectWorkplaceConfig } from "store/slices/workplaceslice";
import { PageContainer } from "components/styled/pagecontainer";
import { Sticky } from "components/styled/sticky"

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
      <Sticky direction="top">
        <CommandMenu />
        <MainMenu tabs={tabs} />
      </Sticky>

      <PageContainer>
        {configuration[latestMenuTab].render}
        {/* render or children in case we decide to use URL */}
      </PageContainer>

      <Footer tab={footertab} selectedkey={selectedkey} />
    </React.Fragment>
  );
};

export default WorkplaceLayout;
