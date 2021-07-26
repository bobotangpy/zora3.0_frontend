import API from "../../services/api";
import store from "store-js";

const api = new API();

// Action Types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";

// Action Creator
const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

const loginFailed = (msg) => {
  return {
    type: LOGIN_FAILED,
    message: msg,
  };
};

const logoutAction = () => {
  return { type: LOGOUT };
};

export const loginUser = (email, password) => {
  return (dispatch) => {
    return api.login(email, password).then((res) => {
      if (res) {
        console.log("res:::", res);
        if (res === "Wrong Email or Password") {
          dispatch(loginFailed("Wrong Email or Password"));
        } else if (res.token) {
          store.set("user_token", res.token);
          store.set("user_id", res.id);
          store.set("username", res.name);
          store.set("horoscope", res.horoscope);
          dispatch(loginSuccess());
        }
      }
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    console.log("logging out");
    store.clearAll();

    dispatch(logoutAction());
  };
};
