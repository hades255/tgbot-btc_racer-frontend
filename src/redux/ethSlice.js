import { createSlice } from "@reduxjs/toolkit";
import { fix2, getAverage, selectLastItems } from "../helper/func";

const ehtSlice = createSlice({
  name: "eth",
  initialState: { prices: [], curPrice: 0, betPrice: 0 },
  reducers: {
    addEth: (state, payload) => {
      const avgtemp = payload.payload;
      if (avgtemp) {
        state.curPrice = fix2(avgtemp, 3);
        if (state.prices.length === 0) state.prices = [avgtemp];
        else {
          state.prices = selectLastItems([...state.prices, avgtemp], 270);
        }
      } else {
        if (state.prices.length) {
          const _avgtemp = getAverage(state.prices);
          state.curPrice = fix2(_avgtemp, 3);
          state.prices = selectLastItems([...state.prices, _avgtemp], 270);
        }
      }
    },
    betGame: (state, payload) => {
      state.betPrice = payload.payload;
    },
  },
});

export const { addEth, betGame } = ehtSlice.actions;
export default ehtSlice.reducer;
