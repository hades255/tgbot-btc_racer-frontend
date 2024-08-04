import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import HomeIcon from "../../assets/icons/Home";
import TaskIcon from "../../assets/icons/Task";
import UsersIcon from "../../assets/icons/Users";
import SurpriseIcon from "../../assets/icons/Surprise";
import LeaderboardIcon from "../../assets/icons/Leaderboard";
import { login } from "../../redux/authSlice";
import NavbarItem from "./NavbarItem";
import axios from "axios";
import { init } from "../../redux/fuelSlice";
import { BACKEND_PATH } from "../../constants/config";

const Navbar = () => {
  const location = useLocation();
  const [active, setActive] = useState("/");
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

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );

  useEffect(() => {
    const userId = queryParams.get("userId") || "7086461598";
    const username = queryParams.get("username") || "smart guy";
    const name = queryParams.get("name") || "smart guy";
    if (userId) {
      (async () => {
        try {
          const response = await axios.get(
            `${BACKEND_PATH}/user?userId=${userId}&name=${name}&username=${username}`
          );
          const point = response.data.data.point;
          const user = response.data.data.user;
          dispatch(login({ ...user, userId, point, name, username }));
          dispatch(init(response.data.data.fuel));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [queryParams, dispatch]);

  useEffect(() => {
    setActive(location.pathname);
  }, [location, dispatch]);

  return (
    <>
      <div className="w-full flex justify-center align-middle fixed bottom-[0px] mx-auto">
        <div className="flex justify-center h-16 w-full bg-[#000713] px-3">
          {navbar.map((item, index) => (
            <NavbarItem {...item} key={index} active={active === item.url} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
