import React, { ReactNode } from "react";
import { Label } from "@fluentui/react";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IState from "models/state";
import IWorkplaceConfiguration, { TabSchema } from "models/workplace";
import tabsConfiguration from "pages/methodologies/canadian/tabsconfiguration";

import GeneralForm from "pages/methodologies/canadian/projectforms/generalform";
import SpecificationsForm from "pages/methodologies/canadian/licitationforms/specificationsform";
import FormsTutorials from "pages/methodologies/canadian/tutorials/formstutorial";

const initialState: IWorkplaceConfiguration = {
    tabsSchema: tabsConfiguration,
    latestMenuTab: "key2",
    configuration: { // menuTabKey : { toolBarComponentToRender, latestFormTab, pageComponentToRender}
        key1: { tools: <Label>Pivot #1</Label>, tab: "key1", page: <React.Fragment /> },
        key2: { tools: <Label>Pivot #2</Label>, tab: "key1", page: <GeneralForm /> },
        key3: { tools: <Label>Pivot #3</Label>, tab: "key1", page: <SpecificationsForm /> },
        key4: { tools: <Label>Pivot #4</Label>, tab: "key1", page: <FormsTutorials /> },
        key5: { tools: <Label>Pivot #5</Label>, tab: "key1", page: <React.Fragment /> },
        key6: { tools: <Label>Pivot #6</Label>, tab: "key1", page: <React.Fragment /> },
    }
};

const workplaceSlice = createSlice({
    name: "workplace",
    initialState,
    reducers: {
        setTabSchema: (state: IWorkplaceConfiguration, action: PayloadAction<{ tabs: TabSchema }>) => {
            state.tabsSchema = action.payload.tabs;
        },
        setLatestMenuTab: (state: IWorkplaceConfiguration, action: PayloadAction<{ tabKey: string }>) => {
            state.latestMenuTab = action.payload.tabKey;
        },
        setConfiguration: (state: IWorkplaceConfiguration, action: PayloadAction<{ key: string, tab: string, page: ReactNode }>) => {
            const { key, tab, page } = action.payload;
            const { tools } = state.configuration[key];
            state.configuration[key] = { tools, tab, page }
        }
    },
});

export const selectWorkplaceConfig = (state: IState) => state.workplace;
export const { setTabSchema, setLatestMenuTab, setConfiguration } = workplaceSlice.actions;

export default workplaceSlice.reducer;
