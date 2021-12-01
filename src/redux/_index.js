import authReducer from "./authSlice";
import mainCatReducer from "./mainCatSlice";
import subCatReducer from "./subCatSlice";
import styleReducer from "./styleSlice";
import productsDataReducer from "./productsDataSlice";
import cartReducer from "./cartSlice";
import { configureStore } from "@reduxjs/toolkit";

export const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    mainCat: mainCatReducer,
    subCat: subCatReducer,
    style: styleReducer,
    productsData: productsDataReducer,
    cart: cartReducer,
  },
});
