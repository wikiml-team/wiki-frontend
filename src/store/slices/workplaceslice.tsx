import React, { ReactNode } from "react";
import { Label } from "@fluentui/react";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IState from "models/state";
import IWorkplaceConfiguration from "models/workplace";

import GeneralForm from "pages/methodologies/canadian/projectforms/generalform";
import SpecificationsForm from "pages/methodologies/canadian/licitationforms/specificationsform";
import FormsTutorials from "pages/methodologies/canadian/tutorials/formstutorial";

const initialState: IWorkplaceConfiguration = {
    latestMenuTab: "key2",
    latestFormTab: "key1",
    configuration: {
        key1: { tools: <Label>Pivot #1</Label>,  formtab: "key1", render: <React.Fragment /> },
        key2: { tools: <Label>Pivot #2</Label>,  formtab: "key1", render: <GeneralForm /> },
        key3: { tools: <Label>Pivot #3</Label>,  formtab: "key1", render: <SpecificationsForm /> },
        key4: { tools: <Label>Pivot #4</Label>,  formtab: "key1", render: <FormsTutorials /> },
        key5: { tools: <Label>Pivot #5</Label>,  formtab: "key1", render: <React.Fragment /> },
        key6: { tools: <Label>Pivot #6</Label>,  formtab: "key1", render: <React.Fragment /> },
    }
};

const workplaceSlice = createSlice({
    name: "workplace",
    initialState,
    reducers: {
        setLatestMenuTab: (state: IWorkplaceConfiguration, action: PayloadAction<{ tab: string }>) => {
            state.latestMenuTab = action.payload.tab;
        },
        setLatestFormTab: (state: IWorkplaceConfiguration, action: PayloadAction<{ tab: string }>) => {
            state.latestFormTab = action.payload.tab;
        },
        setConfiguration: (state: IWorkplaceConfiguration, action: PayloadAction<{ key: string, formtab: string, render: ReactNode }>) => {
            const { key, formtab, render } = action.payload;
            const {tools} = state.configuration[key];
            state.configuration[key] = { tools , formtab, render }
        }
    },
});

export const selectWorkplaceConfig = (state: IState) => state.workplace;
export const { setLatestMenuTab, setLatestFormTab, setConfiguration } = workplaceSlice.actions;

export default workplaceSlice.reducer;
