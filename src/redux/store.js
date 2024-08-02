import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import fuelSlice from "./fuelSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    fuel: fuelSlice,
  },
});
