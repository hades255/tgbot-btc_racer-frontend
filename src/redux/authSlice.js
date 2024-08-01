import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userId: "",
    name: "",
    username: "",
    point: 0,
  },
  reducers: {
    login: (state, payload) => {
      state.isAuthenticated = true;
      state.userId = payload.payload.userId;
      state.point = payload.payload.point;
      state.name = payload.payload.name;
      state.username = payload.payload.username;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    setScore: (state, payload) => {
      state.point = payload.payload;
    },
  },
});

export const { login, logout, setScore } = authSlice.actions;
export default authSlice.reducer;
