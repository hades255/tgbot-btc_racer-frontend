import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import fuelSlice from "./fuelSlice";
import toastSlice from "./toastSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    fuel: fuelSlice,
    toast: toastSlice,
  },
});
