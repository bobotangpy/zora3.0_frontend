import { createSlice } from "@reduxjs/toolkit";

const subCatSlice = createSlice({
  name: "subCat",
  initialState: { selectedSubCat: null },
  reducers: {
    updateSubCat: (state, action) => {
      state.selectedSubCat = action.payload;
      console.log("subCat::", state.selectedSubCat);
    },
    resetSubCat: () => initialState,
  },
});

export const { updateSubCat, resetSubCat } = subCatSlice.actions;

export default subCatSlice.reducer;
