import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import HomeIcon from "../../assets/icons/Home";
import TaskIcon from "../../assets/icons/Task";
import UsersIcon from "../../assets/icons/Users";
import SurpriseIcon from "../../assets/icons/Surprise";
import LeaderboardIcon from "../../assets/icons/Leaderboard";
import { login } from "../../redux/authSlice";
import NavbarItem from "./NavbarItem";
import { init } from "../../redux/fuelSlice";
import { BACKEND_PATH } from "../../constants/config";
import { upgradeExtra } from "../../redux/extraSlice";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = ({ params }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const [active, setActive] = useState("/");

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
    // window.alert("1" + JSON.stringify(params));
    // if (params !== null) window.alert("2" + JSON.stringify(params.user));
    if (isAuthenticated || !params || !params.user) return;
    const userId = params.user.id;
    window.alert(userId);
    const username = params.user.username;
    const name = params.user.first_name + " " + params.user.last_name;
    let refer = queryParams.get("refer");
    if (params.start_param) {
      refer = params.start_param.toString().substring(9);
    }
    if (userId) {
      (async () => {
        try {
          const response = await axios.get(
            `${BACKEND_PATH}/user?userId=${userId}&name=${name}&username=${username}&refer=${refer}`
          );
          const point = response.data.point;
          const user = response.data.user;
          const bonus = response.data.bonus;
          if (refer && bonus) {
            dispatch(
              upgradeExtra([
                {
                  key: "message",
                  value: `You've earned ${bonus}+ bonus points by referral code!`,
                },
                { key: "showCongratulations", value: true },
              ])
            );
          }
          dispatch(login({ ...user, userId, point, name, username }));
          dispatch(init(response.data.fuel));
          if (response.data.autoearned) {
            setTimeout(
              () => {
                dispatch(
                  upgradeExtra([
                    {
                      key: "message",
                      value: `You've earned ${response.data.autoearned} points from Auto Pilot!`,
                    },
                    { key: "showModal", value: true },
                  ])
                );
              },
              refer && bonus ? 5000 : 100
            );
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [queryParams, params, dispatch, isAuthenticated]);

  useEffect(() => {
    setActive(location.pathname);
  }, [location, dispatch]);

  return (
    <>
      <div className="w-full fixed bottom-0 mx-auto z-30">
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
