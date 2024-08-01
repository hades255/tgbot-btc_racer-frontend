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

  useEffect(() => {
    setActive(location.pathname);
    const queryParams = new URLSearchParams(location.search);
    //  todo
    const userId = "user one"; //queryParams.get("userId");
    const name = "smart guy"; //queryParams.get("userId");
    if (userId) {
      (async () => {
        try {
          //  todo
          //  https://d6bf-172-86-113-74.ngrok-free.app
          const response = await axios.get(
            `http://127.0.0.1:5000/user?userId=${userId}&name=${name}`
          );
          const point = response.data.data;
          dispatch(login({ userId, point, name }));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [location, dispatch]);

  return (
    <>
      <div className="w-full flex justify-center align-middle fixed bottom-[20px] mx-auto">
        <div className="flex justify-center align-middle h-[70px] rounded-[50px] bg-zinc-700 px-8">
          {navbar.map((item, index) => (
            <NavbarItem {...item} key={index} active={active === item.url} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
