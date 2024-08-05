import { createSlice } from "@reduxjs/toolkit";

const selectLastItems = (arr, count) => {
  // If the array length is less than the count, return the entire array
  if (arr.length <= count) {
    return arr;
  }
  return arr.slice(-count);
};

const ehtSlice = createSlice({
  name: "eth",
  initialState: { prices: [], curPrice: 0 },
  reducers: {
    addEth: (state, payload) => {
      state.prices = selectLastItems([...state.prices, payload.payload], 120);
      state.curPrice = payload.payload;
    },
  },
});

export const { addEth } = ehtSlice.actions;
export default ehtSlice.reducer;
