import React, { useCallback } from "react";
import DotIcon from "../../assets/icons/Dot";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import CheckIcon from "../../assets/icons/Check";

const OTTbutton = () => {
  const navigate = useNavigate();
  const { followTwitter, joinNewsletter, joinAnnouncementChannel } = useAuth();

  const handleClick = useCallback(() => navigate("/tasks"), [navigate]);

  return (
    <>
      <div onClick={handleClick} className="flex my-2 hover:cursor-pointer">
        <div className="mr-1 pt-1">
          {followTwitter && joinNewsletter && joinAnnouncementChannel ? (
            <CheckIcon width={14} height={14} color={"white"} />
          ) : (
            <DotIcon width={14} height={14} color={"#04C3FF"} />
          )}
        </div>
        <div className="flex flex-col">
          <div className="text-md font-medium flex">
            <span className="text-[#79DEFE]">Finish All One Time Tasks</span>
          </div>
          <span className="text-[#9E9E9E] text-sm">
            Finish all the one time tasks on the tasks page
          </span>
        </div>
      </div>
    </>
  );
};

export default OTTbutton;
