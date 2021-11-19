import { ReactNode } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import IState from "models/state";
import IWorkplaceConfiguration, { TabSchema } from "models/workplace";
import tabsConfiguration from "pages/forms/canadian/tabsconfiguration";

const initialState: IWorkplaceConfiguration = {
  tabsSchema: tabsConfiguration,
  latestMenuTab: "key2",
  configuration: {
    // menuTabKey : { toolBarComponentToRender, latestFormTab, pageComponentToRender}
    key1: {
      tools: tabsConfiguration.findByKey("key1").render,
      tab: "key1",
      page: tabsConfiguration.findChildByKey("key1", "key1").render,
    },
    key2: {
      tools: tabsConfiguration.findByKey("key2").render,
      tab: "key1",
      page: tabsConfiguration.findChildByKey("key2", "key1").render,
    },
    key3: {
      tools: tabsConfiguration.findByKey("key3").render,
      tab: "key1",
      page: tabsConfiguration.findChildByKey("key3", "key1").render,
    },
    key4: {
      tools: tabsConfiguration.findByKey("key4").render,
      tab: "key1",
      page: tabsConfiguration.findChildByKey("key4", "key1").render,
    },
    key5: {
      tools: tabsConfiguration.findByKey("key5").render,
      tab: "key1",
      page: tabsConfiguration.findChildByKey("key5", "key1").render,
    },
    key6: {
      tools: tabsConfiguration.findByKey("key6").render,
      tab: "key1",
      page: tabsConfiguration.findChildByKey("key6", "key1").render,
    },
  },
};

const workplaceSlice = createSlice({
  name: "workplace",
  initialState,
  reducers: {
    // Set Tab Configuration when methodology changes
    setTabSchema: (
      state: IWorkplaceConfiguration,
      action: PayloadAction<{ tabs: TabSchema }>
    ) => {
      state.tabsSchema = action.payload.tabs;
    },
    setLatestMenuTab: (
      state: IWorkplaceConfiguration,
      action: PayloadAction<{ tabKey: string }>
    ) => {
      state.latestMenuTab = action.payload.tabKey;
    },
    setConfiguration: (
      state: IWorkplaceConfiguration,
      action: PayloadAction<{ key: string; tab: string; page: ReactNode }>
    ) => {
      const { key, tab, page } = action.payload;
      const { tools } = state.configuration[key];
      state.configuration[key] = { tools, tab, page };
    },
  },
});

export const selectWorkplaceConfig = (state: IState) => state.workplace;
export const { setTabSchema, setLatestMenuTab, setConfiguration } =
  workplaceSlice.actions;

export default workplaceSlice.reducer;
