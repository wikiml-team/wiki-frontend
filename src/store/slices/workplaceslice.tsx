import { createSlice } from "@reduxjs/toolkit";
import IState, { WorkplaceConfiguration } from "models/state";

const initialState: WorkplaceConfiguration = {
    PivotTab: "key1",
    PageTab: "key1",
};

const workplaceSlice = createSlice({
    name: "workplace",
    initialState,
    reducers: {
        setCurrentWorkplace: (state, action) => {
            state = action.payload;
        },
    },
});

export const selectWorkplaceConfig = (state: IState) => state.workplace;
export const { setCurrentWorkplace } = workplaceSlice.actions;

export default workplaceSlice.reducer;
