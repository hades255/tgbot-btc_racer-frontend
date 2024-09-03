import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { BACKEND_PATH } from "../../constants/config.js";

const Global = () => {
  const { userId, name, point } = useAuth();
  const [users, setUsers] = useState([]);
  const [usersCt, setUsersCt] = useState(0);
  const [rank, setRank] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${BACKEND_PATH}/user/all?userId=${userId}`
        );
        setUsers(response.data.data || []);
        setUsersCt(response.data.count || 0);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (users)
      setRank(
        users.findIndex((item) => item.chatId.toString() === userId.toString())
      );
  }, [users, userId]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mx-3">
        <span className="text-slate-500 text-sm">
          {usersCt.toLocaleString()} pilots
        </span>
        <span className="text-slate-500 text-sm">Total pts earned</span>
      </div>
      <div className="flex flex-col pt-2">
        {rank !== null && rank > 10 && (
          <div className="py-3 px-3 flex justify-between bg-[#263f68] rounded-md">
            <div className="flex">
              <div className="w-14 text-sm backdrop-blur-lg text-white">
                10+
              </div>
              <div className="text-sm backdrop-blur-lg text-white">{name}</div>
            </div>
            <div className="flex">
              <span className="text-sm backdrop-blur-lg text-slate-400">
                🚀 {Math.round(point).toLocaleString()} pts
              </span>
            </div>
          </div>
        )}
        {users.map((item, index) => (
          <div
            key={index}
            className={`py-3 px-3 flex justify-between ${
              item.chatId.toString() === userId.toString()
                ? "bg-[#263f68] rounded-md"
                : ""
            }`}
          >
            <div className="flex w-52 max-w-52">
              <div className="w-10 text-sm backdrop-blur-lg text-white">
                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : `#${index + 1}`}
              </div>
              <div className="text-sm backdrop-blur-lg text-white">
                {item.name}
              </div>
            </div>
            <div className="text-sm backdrop-blur-lg text-slate-400">
              🚀 {Math.round(item.point).toLocaleString()} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Global;
