import { createSlice } from "@reduxjs/toolkit";

const styleSlice = createSlice({
  name: "style",
  initialState: { style: null },
  reducers: {
    updateStyle: (state, action) => {
      state, (style = action.payload);
    },
  },
});

export default styleSlice.reducer;
