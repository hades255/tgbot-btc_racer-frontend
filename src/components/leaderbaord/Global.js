import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const Global = () => {
  const { userId, name, point } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        //  todo
        const response = await axios.get(
          // `http://127.0.0.1:5000/user/all?userId=${userId}`
          `https://d6bf-172-86-113-74.ngrok-free.app/user/all?userId=${userId}`
        );
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <span className="text-slate-500 text-xs">1 racers</span>
        <span className="text-slate-500 text-xs">Total pts earned</span>
      </div>
      <div className="flex flex-col">
        <div className="my-2 flex justify-between">
          <div className="flex">
            <div className="w-14 text-sm backdrop-blur-lg text-white">100+</div>
            <div className="text-sm backdrop-blur-lg text-white">{name}</div>
          </div>
          <div className="flex">
            <span className="text-sm backdrop-blur-lg text-slate-400">
              🚀 {point} pts
            </span>
          </div>
        </div>
        {users.map((item, index) => (
          <div key={index} className="my-2 flex justify-between">
            <div className="flex">
              <div className="w-14 text-sm backdrop-blur-lg text-white">
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
            <div className="flex">
              <span className="text-sm backdrop-blur-lg text-slate-400">
                🚀 {item.point} pts
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-slate-500 text-sm my-4">1-100 players</div>
    </div>
  );
};

export default Global;
