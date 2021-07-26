// Reducer: transform the state
import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from "../actions/authActions";
import store from "store-js";

const initialState = {
  isAuthenticated: store.get("user_token") !== null || false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        errMsg: "Incorrect email or password",
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };

    default:
      return { ...state };
  }
};
