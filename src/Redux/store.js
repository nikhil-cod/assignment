import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import appReducer from "./index"
const reducer = combineReducers({
  appReducer,
});
const store = configureStore({ reducer });
export default store;
