import { createSlice } from "@reduxjs/toolkit";
import API from "../services/api";
import store from "store-js";

const api = new API();

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: store.get("user_token"),
    userId: store.get("user_id"),
    userName: store.get("username"),
    userSign: store.get("horoscope"),
    msg: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = action.payload.token;
      state.userId = action.payload.id;
      state.userName = action.payload.username;
      state.userSign = action.payload.horoscope;
      state.msg = null;
      // store.set("user_token", action.payload.token);
      // store.set("user_id", action.payload.id);
      // store.set("username", action.payload.name);
      // store.set("horoscope", action.payload.horoscope);
    },
    loginFailed: (state) => {
      state.isAuthenticated = false;
      state.msg = "Incorrect Email or Password";
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.userName = null;
      state.userSign = null;
    },
  },
});
export default authSlice.reducer;

// Actions
const { loginSuccess, loginFailed, logout } = authSlice.actions;

export const loginUser = (email, password) => async (dispatch) => {
  try {
    await api.login(email, password).then((res) => {
      if (res) {
        console.log("res:::", res);

        if (res === "Wrong Email or Password") {
          dispatch(loginFailed());
        } else if (res.token) {
          store.set("user_token", res.token);
          store.set("user_id", res.id);
          store.set("username", res.name);
          store.set("horoscope", res.horoscope);
          dispatch(loginSuccess(res));
        }
      }
    });
  } catch (e) {
    return console.error(e.message);
  }
};

export const logoutUser = () => {
  return (dispatch) => {
    console.log("logging out");
    store.clearAll();

    dispatch(logout());
  };
};
