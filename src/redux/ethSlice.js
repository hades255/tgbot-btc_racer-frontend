import { createSlice } from "@reduxjs/toolkit";
import { fix2, getAverage, selectLastItems } from "../helper/func";

const ehtSlice = createSlice({
  name: "eth",
  initialState: { prices: [], temp: [], curPrice: 0 },
  reducers: {
    addEth: (state, payload) => {
      state.temp = [...state.prices, payload.payload];
    },
    countOnEth: (state) => {
      const avgtemp = getAverage(state.temp);
      state.temp = [];
      if (avgtemp) {
        state.curPrice = fix2(avgtemp); //payload.payload;
        if (state.prices.length === 0) state.prices = [avgtemp];
        else {
          state.prices = selectLastItems([...state.prices, avgtemp], 54);
        }
      } else {
        if (state.prices.length)
          state.prices = selectLastItems(
            [...state.prices, state.prices[state.prices.length - 1]],
            54
          );
      }
    },
  },
});

export const { addEth, countOnEth } = ehtSlice.actions;
export default ehtSlice.reducer;
