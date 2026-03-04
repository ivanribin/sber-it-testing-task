import { createSlice, PayloadAction, type Slice } from "@reduxjs/toolkit";

interface IApplicationSliceState {
    isLoading: boolean;
}

const initialState: IApplicationSliceState = {
    isLoading: false,
};

const ApplicationSlice: Slice<IApplicationSliceState> = createSlice({
    name: "ApplicationSlice",
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setIsLoading } = ApplicationSlice.actions;
export default ApplicationSlice.reducer;
