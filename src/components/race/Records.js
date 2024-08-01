import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import Modal from "../common/Modal";
import Up from "../../assets/icons/Up";
import Down from "../../assets/icons/Down";
import { useAuth } from "../../contexts/AuthContext";

const Records = ({ show, onClose }) => {
  const { userId } = useAuth();
  const [records, setRecords] = useState([]);

  //  todo
  //  https://d6bf-172-86-113-74.ngrok-free.app
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/race?userId=" + userId
        );
        setRecords(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  return (
    <>
      <Modal show={show} onClose={onClose} title={"Racing records"}>
        <div className="flex flex-col">
          {records?.map(
            (item, index) =>
              index < 5 && (
                <div key={index} className="my-2 flex flex-col">
                  {index !== 0 && (
                    <div className="w-full border-b-2 border-zinc-500" />
                  )}
                  <div className="flex">
                    <div className="w-[120px] flex flex-col">
                      <span className="text-xs text-zinc-500">Your Guess</span>
                      <span className="font-bold text-white flex">
                        {item.guess.substr(0, 1).toUpperCase() +
                          item.guess.substr(1)}
                        <span className="ml-1 mt-1">
                          {item.guess === "moon" && (
                            <Up width={16} height={16} color={"green"} />
                          )}
                          {item.guess === "doom" && (
                            <Down width={16} height={16} color={"red"} />
                          )}
                        </span>
                      </span>
                    </div>
                    <div className="w-[120px] flex flex-col">
                      <span className="text-xs text-zinc-500">Result</span>
                      <span className="font-bold text-white">
                        {item.result ? "Win" : "Lose"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-500">
                        Consecutive Wins
                      </span>
                      <span className="font-bold text-white">
                        {item.consecutiveWins}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500 backdrop-blur">
                    {moment(item.createdAt).format("MMM DD, YYYY, HH:mm:ss")}
                  </div>
                </div>
              )
          )}
        </div>
      </Modal>
    </>
  );
};

export default Records;
