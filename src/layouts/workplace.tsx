import React, { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { useSpring, useTransition } from "react-spring";
import { RemoveScrollBar } from 'react-remove-scroll-bar';

import { selectWorkplaceConfig } from "store/slices/workplaceslice";
import PageContainer from "components/styled/pagecontainer";
import { Sticky } from "components/styled/sticky"

import CommandMenu from "components/menus/commands/";
import MainMenu from "components/menus/mainmenu";
import ToolBar from "components/menus/mainmenu/toolbar";
import Footer from "components/menus/footer";

const WorkplaceLayout: FunctionComponent = (props) => {

  // Global state variables
  const { latestMenuTab, configuration, tabsSchema } = useSelector(selectWorkplaceConfig);
  const { tools } = configuration[latestMenuTab];
  const { page } = configuration[latestMenuTab];
  const footertab = tabsSchema.findByKey(latestMenuTab);
  const selectedkey = configuration[latestMenuTab].tab;

  // Toolbar Animation State & Controls
  const [fixToolBar, setFixToolBar] = useState(true)

  const [showToolBar, setShowToolBar] = useState(true)
  const toolBarTransition = useTransition(showToolBar, {
    from: { x: 0, y: -34, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 0, y: -34, opacity: 0 },
  })

  const pageSpring = useSpring({
    marginTop: showToolBar ? 180 : 80,
    from: {
      marginTop: 180,
    },
  })

  const handleToolbarClose = () => {
    setShowToolBar(false);
    setFixToolBar(false);
  }

  const handleToolbarFix = () => {
    setFixToolBar(true);
  }

  return (
    <React.Fragment>
      <RemoveScrollBar />

      <Sticky direction="top">
        <CommandMenu />
        <MainMenu tabs={tabsSchema} setShowToolBar={setShowToolBar} />
        <ToolBar transition={toolBarTransition} isFixed={fixToolBar} handleClose={handleToolbarClose} handleFix={handleToolbarFix}>
          {tools}
        </ToolBar>
      </Sticky>

      <PageContainer spring={pageSpring} scrollHeight={showToolBar ? "calc(100vh - 220px)" : "calc(100vh - 110px)"}>
        {page}
      </PageContainer>

      <Footer tab={footertab} selectedkey={selectedkey} />

    </React.Fragment>
  );
};

export default WorkplaceLayout;
