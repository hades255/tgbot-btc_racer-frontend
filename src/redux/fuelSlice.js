import { createSlice } from "@reduxjs/toolkit";

const fuelSlice = createSlice({
  name: "fuel",
  initialState: {
    fuelcount: 10,
    cooldown: 0,
    freeBoost: 3,
  },
  reducers: {
    init: (state, payload) => {
      state.fuelcount = payload.payload.fuelcount;
      state.cooldown = payload.payload.cooldown;
      state.freeBoost = payload.payload.freeBoost;
    },
    increase: (state) => {
      if (state.fuelcount >= 10) return;
      const newc = state.fuelcount + 1;
      state.fuelcount = newc > 10 ? 10 : newc;
      state.cooldown = newc > 10 ? 0 : state.cooldown;
    },
    boost: (state) => {
      if (state.fuelcount >= 10 || state.freeBoost <= 0) return;
      const newc = state.fuelcount + 3;
      state.fuelcount = newc > 10 ? 10 : newc;
      state.cooldown = newc > 10 ? 0 : state.cooldown;
      state.freeBoost = state.freeBoost - 1;
    },
    decrease: (state) => {
      if (state.fuelcount <= 0) return;
      const newc = state.fuelcount - 1;
      state.fuelcount = newc < 0 ? 0 : newc;
      state.cooldown = state.cooldown || 90;
    },
    countOn: (state) => {
      if (state.fuelcount >= 10) return;
      state.cooldown = (state.cooldown || 90) - 1;
      if (state.cooldown === 0) {
        state.fuelcount++;
        if (state.fuelcount >= 10) {
          state.cooldown = 0;
        } else {
          state.cooldown = 90;
        }
      }
    },
  },
});

export const { init, increase, decrease, countOn, boost } = fuelSlice.actions;
export default fuelSlice.reducer;
