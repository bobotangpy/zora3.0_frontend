import { createSlice } from "@reduxjs/toolkit";

const mainCatSlice = createSlice({
  name: "mainCat",
  initialState: { selectedMainCat: null },
  reducers: {
    updateMainCat: (state, action) => {
      state.selectedMainCat = action.payload;
      // console.log("mainCat::", state.selectedMainCat);
    },
    resetMainCat: (state, action) => {
      state.selectedMainCat = action.payload;
    },
  },
});

export const { updateMainCat, resetMainCat } = mainCatSlice.actions;

export default mainCatSlice.reducer;
