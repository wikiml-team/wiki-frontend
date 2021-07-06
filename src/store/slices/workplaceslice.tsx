import { createSlice } from "@reduxjs/toolkit";
import IState from "models/state";
import IWorkplaceConfiguration from "models/workplace";

const initialState: IWorkplaceConfiguration = {
    latestMenuTab: "key1",
    latestForm: "key2",
    tabsConfigurations: new Map([
        ["key1", "key1"],
        ["key2", "key1"],
        ["key3", "key1"],
        ["key4", "key1"],
        ["key5", "key1"],
        ["key6", "key1"],
    ]),
};

const workplaceSlice = createSlice({
    name: "workplace",
    initialState,
    reducers: {
        setCurrentWorkplace: (state, action) => {
            console.log("state: ", state)
            console.log("action: ", action)
            // state = action.payload;
        },
    },
});

export const selectWorkplaceConfig = (state: IState) => state.workplace;
export const { setCurrentWorkplace } = workplaceSlice.actions;

export default workplaceSlice.reducer;
