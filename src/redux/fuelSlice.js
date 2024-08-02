import { createSlice } from "@reduxjs/toolkit";

const fuelSlice = createSlice({
  name: "fuel",
  initialState: {
    fuelcapacity: 10,
    fuelcount: 10,
    cooldown: 0,
    freeBoost: 3,
    fueltank: 0,
  },
  reducers: {
    init: (state, payload) => {
      state.fueltank = payload.payload.fueltank;
      state.fuelcount = payload.payload.fuelcount;
      state.cooldown = payload.payload.cooldown;
      state.freeBoost = payload.payload.freeBoost;
      state.fuelcapacity = payload.payload.fuelcapacity;
    },
    increase: (state) => {
      if (state.fuelcount >= state.fuelcapacity) return;
      const newc = state.fuelcount + 1;
      state.fuelcount = newc > state.fuelcapacity ? state.fuelcapacity : newc;
      state.cooldown = newc > state.fuelcapacity ? 0 : state.cooldown;
    },
    decrease: (state) => {
      if (state.fuelcount <= 0) return;
      const newc = state.fuelcount - 1;
      state.fuelcount = newc < 0 ? 0 : newc;
      state.cooldown = state.cooldown || 90;
    },
    boost: (state) => {
      if (state.freeBoost <= 0) return;
      const newc = state.fuelcount + 3;
      state.fuelcount = newc > state.fuelcapacity ? state.fuelcapacity : newc;
      state.cooldown = newc > state.fuelcapacity ? 0 : state.cooldown;
      state.freeBoost = state.freeBoost - 1;
    },
    upgrade: (state) => {
      state.fueltank = state.fueltank + 1;
      state.fuelcount = state.fuelcount + 2;
      state.fuelcapacity = state.fuelcapacity + 2;
    },
    countOn: (state) => {
      if (state.fuelcount >= state.fuelcapacity) return;
      state.cooldown = (state.cooldown || 90) - 1;
      if (state.cooldown === 0) {
        state.fuelcount++;
        if (state.fuelcount >= state.fuelcapacity) {
          state.cooldown = 0;
        } else {
          state.cooldown = 90;
        }
      }
    },
  },
});

export const { init, increase, decrease, countOn, boost, upgrade } =
  fuelSlice.actions;
export default fuelSlice.reducer;
