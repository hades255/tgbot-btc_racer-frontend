import { createSlice } from "@reduxjs/toolkit";

const extraSlice = createSlice({
  name: "extra",
  initialState: { showCongratulations: false, message: "" },
  reducers: {
    upgradeExtra: (state, payload) => {
      state[payload.payload.key] = payload.payload.value;
    },
  },
});

export const { upgradeExtra } = extraSlice.actions;
export default extraSlice.reducer;
