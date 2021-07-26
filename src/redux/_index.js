import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import styleReducer from "./styleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    style: styleReducer,
  },
});
