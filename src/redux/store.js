import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./modules";
import { thunk } from "redux-thunk";
import { setAuthToken } from "../utils";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add redux-thunk here
  devTools: true,
});

let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();

  if (previousState.users.token !== currentState.users.token) {
    const token = currentState.users.token;
    setAuthToken(token);
  }
});

export default store;
