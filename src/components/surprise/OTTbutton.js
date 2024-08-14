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
          <div className="text-white text-md font-medium flex">
            <span className="text-[#69d3fd] hover:cursor-pointer">
              Finish All One Time Tasks
            </span>
            <div className="ml-1 flex items-center"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTTbutton;
