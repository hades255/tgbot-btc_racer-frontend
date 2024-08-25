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
import { upgradeExtra } from "../../redux/extraSlice";
import { addToast } from "../../redux/toastSlice";

const Navbar = () => {
  const location = useLocation();
  const [active, setActive] = useState("/");
  const dispatch = useDispatch();

  const navbar = useMemo(() => {
    return [
      {
        title: "Battle",
        icon: <HomeIcon width={22} height={22} color={"#A8ADB7"} />,
        url: "/",
      },
      {
        title: "Leaderboard",
        icon: <LeaderboardIcon width={22} height={22} color={"#A8ADB7"} />,
        url: "/leaderboard",
      },
      {
        title: "Tasks",
        icon: <TaskIcon width={22} height={22} color={"#A8ADB7"} />,
        url: "/tasks",
      },
      {
        title: "Invite",
        icon: <UsersIcon width={22} height={22} color={"#A8ADB7"} />,
        url: "/invite",
      },
      {
        title: "Bonuses",
        icon: <SurpriseIcon width={22} height={22} color={"#A8ADB7"} />,
        url: "/surprise",
      },
    ];
  }, []);

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );

  useEffect(() => {
    //  fix
    if (queryParams.size === 0) return;
    if (!queryParams.get("userId")) return;
    const userId = queryParams.get("userId") || "7086461598";
    const username = queryParams.get("username") || "smart guy";
    const name = queryParams.get("name") || "smart guy";
    const refer = queryParams.get("refer") || "";
    const bonus = queryParams.get("bonus") || "";
    if (refer && bonus) {
      dispatch(
        upgradeExtra({
          key: "message",
          value: `You've earned ${bonus}+ bonus points by referral code!`,
        })
      );
      dispatch(upgradeExtra({ key: "showCongratulations", value: true }));
    }
    if (userId) {
      (async () => {
        try {
          const response = await axios.get(
            `${BACKEND_PATH}/user?userId=${userId}&name=${name}&username=${username}`
          );
          const point = response.data.point;
          const user = response.data.user;
          dispatch(login({ ...user, userId, point, name, username }));
          dispatch(init(response.data.fuel));
          if (response.data.autoearned) {
            dispatch(
              addToast({
                message: "Success!",
                type: `You've earned ${response.data.autoearned}+ bonus points by Auto Pilot!`,
              })
            );
          }
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
      <div className="w-full fixed bottom-0 mx-auto">
        <div className="flex justify-center h-20 bg-[#000713] px-3">
          {navbar.map((item, index) => (
            <NavbarItem {...item} key={index} active={active === item.url} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
