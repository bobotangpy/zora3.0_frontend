// import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import mainCatReducer from "./mainCatSlice";
import subCatReducer from "./subCatSlice";
import styleReducer from "./styleSlice";
import productsDataReducer from "./productsDataSlice";
import cartReducer from "./cartSlice";
/* Redux-Persist - to persist the data in redux store when the page rehydrates */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//   persistReducer,
//   //   FLUSH,
//   REHYDRATE,
//   //   PAUSE,
//   //   PERSIST,
//   //   PURGE,
//   //   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// // import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// const reducers = combineReducers({
//   auth: authReducer,
//   mainCat: mainCatReducer,
//   subCat: subCatReducer,
//   style: styleReducer,
//   productsData: productsDataReducer,
// });

// const persistConfig = {
//   key: "root",
//   storage,
//   // stateReconciler: autoMergeLevel2,
// };

// const _persistedReducer = persistReducer(persistConfig, reducers);

// export const store = configureStore({
//   reducer: _persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         // ignoredActions: [REHYDRATE],
//       },
//     }),
// });

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
