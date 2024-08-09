import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userId: "",
    name: "",
    username: "",
    point: 0,
    dailyBonusLevel: 0,
    dailyBonus: false,
    dailyBonusVisitLevel: 0,
    dailyBonusVisit: false,
    turboCharger: 0, //  points level per fuel
  },
  reducers: {
    login: (state, payload) => {
      state.isAuthenticated = true;
      state.userId = payload.payload.userId;
      state.point = payload.payload.point;
      state.name = payload.payload.name;
      state.username = payload.payload.username;
      state.turboCharger = payload.payload.turboCharger;
      state.dailyBonusLevel = payload.payload.dailyBonus.level;
      state.dailyBonus = payload.payload.dailyBonus.check;
      state.dailyBonusVisitLevel = payload.payload.dailyBonusVisit.level;
      state.dailyBonusVisit = payload.payload.dailyBonusVisit.check;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    setScore: (state, payload) => {
      state.point = payload.payload;
    },
    upgradeTturboCharger: (state) => {
      state.turboCharger = state.turboCharger + 1;
    },
    upgradeDailyBonus: (state) => {
      state.dailyBonusLevel = state.dailyBonusLevel + 1;
      state.dailyBonus = true;
    },
    upgradeDailyBonusVisit: (state) => {
      state.dailyBonusVisitLevel = state.dailyBonusVisitLevel + 1;
      state.dailyBonusVisit = true;
    },
  },
});

export const {
  login,
  logout,
  setScore,
  upgradeTturboCharger,
  upgradeDailyBonus,
  upgradeDailyBonusVisit,
} = authSlice.actions;
export default authSlice.reducer;
