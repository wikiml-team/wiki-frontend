import React, { ReactNode } from "react";
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
        key1: { formtab: "key1", render: <React.Fragment /> },
        key2: { formtab: "key1", render: <GeneralForm /> },
        key3: { formtab: "key1", render: <SpecificationsForm /> },
        key4: { formtab: "key1", render: <FormsTutorials /> },
        key5: { formtab: "key1", render: <React.Fragment /> },
        key6: { formtab: "key1", render: <React.Fragment /> },
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
            state.configuration[key] = { formtab, render }
        }
    },
});

export const selectWorkplaceConfig = (state: IState) => state.workplace;
export const { setLatestMenuTab, setLatestFormTab, setConfiguration } = workplaceSlice.actions;

export default workplaceSlice.reducer;
