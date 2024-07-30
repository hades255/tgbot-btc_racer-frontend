import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import HomeIcon from "../../assets/icons/Home";
import TaskIcon from "../../assets/icons/Task";
import UsersIcon from "../../assets/icons/Users";
import SurpriseIcon from "../../assets/icons/Surprise";
import LeaderboardIcon from "../../assets/icons/Leaderboard";
import { login } from "../../redux/authSlice";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId");
    if (userId) {
      dispatch(login(userId));
    }
  }, [location, dispatch]);

  return (
    <>
      <div className="w-full flex justify-center align-middle fixed bottom-[20px] mx-auto">
        <div className="flex justify-center align-middle h-[70px] rounded-[50px] bg-zinc-700 px-8">
          <div className="flex flex-col w-[60px] h-full justify-center align-middle">
            <div className="flex justify-center">
              <HomeIcon width={22} height={22} color={"#FFFFFF"} />
            </div>
            <div className="flex justify-center">
              <span className="text-zinc-400 text-[11px]">Race</span>
            </div>
          </div>
          <div className="flex flex-col w-[60px] h-full justify-center align-middle">
            <div className="flex justify-center">
              <LeaderboardIcon width={22} height={22} color={"#FFFFFF"} />
            </div>
            <div className="flex justify-center">
              <span className="text-zinc-400 text-[11px]">Leaderboard</span>
            </div>
          </div>
          <div className="flex flex-col w-[60px] h-full justify-center align-middle">
            <div className="flex justify-center">
              <TaskIcon width={22} height={22} color={"#FFFFFF"} />
            </div>
            <div className="flex justify-center">
              <span className="text-zinc-400 text-[11px]">Tasks</span>
            </div>
          </div>
          <div className="flex flex-col w-[60px] h-full justify-center align-middle">
            <div className="flex justify-center">
              <UsersIcon width={22} height={22} color={"#FFFFFF"} />
            </div>
            <div className="flex justify-center">
              <span className="text-zinc-400 text-[11px]">Invite</span>
            </div>
          </div>
          <div className="flex flex-col w-[60px] h-full justify-center align-middle">
            <div className="flex justify-center">
              <SurpriseIcon width={22} height={22} color={"#FFFFFF"} />
            </div>
            <div className="flex justify-center">
              <span className="text-zinc-400 text-[11px]">Suprises</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
