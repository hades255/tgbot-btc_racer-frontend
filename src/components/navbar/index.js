import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import HomeIcon from "../../assets/icons/Home";
import TaskIcon from "../../assets/icons/Task";
import UsersIcon from "../../assets/icons/Users";
import SurpriseIcon from "../../assets/icons/Surprise";
import LeaderboardIcon from "../../assets/icons/Leaderboard";
import { login } from "../../redux/authSlice";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const navbar = useMemo(() => {
    return [
      {
        title: "Race",
        icon: <HomeIcon width={22} height={22} color={"#FFFFFF"} />,
        url: "/",
      },
      {
        title: "Leaderboard",
        icon: <LeaderboardIcon width={22} height={22} color={"#FFFFFF"} />,
        url: "/leaderboard",
      },
      {
        title: "Tasks",
        icon: <TaskIcon width={22} height={22} color={"#FFFFFF"} />,
        url: "/tasks",
      },
      {
        title: "Invite",
        icon: <UsersIcon width={22} height={22} color={"#FFFFFF"} />,
        url: "/invite",
      },
      {
        title: "Suprises",
        icon: <SurpriseIcon width={22} height={22} color={"#FFFFFF"} />,
        url: "/surprise",
      },
    ];
  }, []);

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
          {navbar.map((item, index) => (
            <NavbarItem {...item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
