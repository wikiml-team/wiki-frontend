import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IState from "models/state";
import IWorkplaceConfiguration from "models/workplace";

const initialState: IWorkplaceConfiguration = {
    latestMenuTab: "key1",
    latestFormTab: "key1",
};

const workplaceSlice = createSlice({
    name: "workplace",
    initialState,
    reducers: {
        setLatestFormTab: (state: IWorkplaceConfiguration, action: PayloadAction<{ tab: string }>) => {
            state.latestFormTab = action.payload.tab;
            return state;
        },
    },
});

export const selectWorkplaceConfig = (state: IState) => state.workplace;
export const { setLatestFormTab } = workplaceSlice.actions;

export default workplaceSlice.reducer;
