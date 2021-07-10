import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";

import tabsConfiguration from "pages/methodologies/canadian/tabsconfiguration";
import IWorkplaceConfiguration, { tabSchemaOperations } from "models/workplace";
import { selectWorkplaceConfig } from "store/slices/workplaceslice";
import { PageContainer } from "components/styled/pagecontainer";

import CommandMenu from "components/menus/commands/";
import MainMenu from "components/menus/mainmenu";
import Footer from "components/menus/footer";
import { mergeStyleSets } from "@fluentui/react";

const WorkplaceLayout: FunctionComponent = (props) => {

  const classes = mergeStyleSets({
    root: {
      top: 0,
      position: "fixed",
      width: "100%",
      overflow: "hidden",
      zIndex: 1
    },
    container: {
      marginTop: 150,
      paddingTop: 20,
    }
  })

  const tabs = tabsConfiguration;

  const { latestMenuTab, configuration }: IWorkplaceConfiguration = useSelector(selectWorkplaceConfig);
  const footertab = tabSchemaOperations.findkey(tabs, latestMenuTab);
  const selectedkey = configuration[latestMenuTab].formtab;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CommandMenu />
        <MainMenu tabs={tabs} />
      </div>

      <div className={classes.container}>
        <PageContainer>
          {configuration[latestMenuTab].render}
          {/* render or children in case we decide to use URL */}
        </PageContainer>
      </div>

      <Footer tab={footertab} selectedkey={selectedkey} />
    </React.Fragment>
  );
};

export default WorkplaceLayout;
