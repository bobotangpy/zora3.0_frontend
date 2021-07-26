import authReducer from "./authReducer";
import { combineReducers } from "redux";

// Combine all Reducers into one here :::
const rootReducer = combineReducers({
  authReducer,
});

export default rootReducer;
