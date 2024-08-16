import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import fuelSlice from "./fuelSlice";
import toastSlice from "./toastSlice";
import ethSlice from "./ethSlice";
import extraSlice from "./extraSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    fuel: fuelSlice,
    toast: toastSlice,
    eth: ethSlice,
    extra: extraSlice,
  },
});
