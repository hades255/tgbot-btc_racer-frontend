import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: { toasts: [] },
  reducers: {
    addToast: (state, payload) => {
      const id = Date.now();
      state.toasts = [...state.toasts, { ...payload.payload, id }];
    },
    removeToast: (state, payload) => {
      state.toasts = state.toasts.filter((item) => item.id !== payload.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
