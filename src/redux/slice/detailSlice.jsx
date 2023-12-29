import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
    name: 'detail',
    initialState: {
        id: 0
    },
    reducers: {
        viewDetailMovie: (state, action) => {
            state.id = action.payload;
        }
    }
});

export const { viewDetailMovie } = detailSlice.actions;
export default detailSlice.reducer;