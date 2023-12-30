/* import tools */
import { createSlice } from '@reduxjs/toolkit';

/* initial app theme state */
const initialState = {
    mode: "dark"
};


export const globalSlice = createSlice({        // create the slice tool to store reducer methods
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {       // switch between light and dark

            state.mode = state.mode === "light" ? "dark" : "light";
        }
    }
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
