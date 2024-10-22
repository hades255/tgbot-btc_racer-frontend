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
    //  one time
    followTwitter: false,
    watchvideo: false,
    joinNewsletter: false,
    joinAnnouncementChannel: false,
    liketweet: false,
    reactPost: false,
    subscribeUtv: false,
    eligibility: false,
    pluslevel: false,
    ethaddress: "",
  },
  reducers: {
    login: (state, payload) => {
      state.isAuthenticated = true;
      state.userId = payload.payload.userId;
      state.point = Math.round(payload.payload.point);
      state.name = payload.payload.name;
      state.username = payload.payload.username;
      state.turboCharger = payload.payload.turboCharger;
      state.dailyBonusLevel = payload.payload.dailyBonus.level;
      state.dailyBonus = payload.payload.dailyBonus.check;
      state.dailyBonusVisitLevel = payload.payload.dailyBonusVisit.level;
      state.dailyBonusVisit = payload.payload.dailyBonusVisit.check;
      state.followTwitter = payload.payload.followTwitter;
      state.watchvideo = payload.payload.watchvideo;
      state.joinNewsletter = payload.payload.joinNewsletter;
      state.joinAnnouncementChannel = payload.payload.joinAnnouncementChannel;
      state.eligibility = payload.payload.eligibility;
      state.ethaddress = payload.payload.ethaddress;
      state.pluslevel = payload.payload.pluslevel;
      state.liketweet = payload.payload.liketweet;
      state.reactPost = payload.payload.reactPost;
      state.subscribeUtv = payload.payload.subscribeUtv;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    setScore: (state, payload) => {
      state.point = Math.round(payload.payload);
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
    upgradeUser: (state, payload) => {
      payload.payload.forEach((item) => {
        state[item.key] = item.value;
      });
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
  upgradeUser,
} = authSlice.actions;
export default authSlice.reducer;
