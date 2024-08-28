import { createSlice } from "@reduxjs/toolkit";

const extraSlice = createSlice({
  name: "extra",
  initialState: { showCongratulations: false, message: "" },
  reducers: {
    upgradeExtra: (state, payload) => {
      payload.payload.forEach((item) => {
        state[item.key] = item.value;
      });
    },
  },
});

export const { upgradeExtra } = extraSlice.actions;
export default extraSlice.reducer;
