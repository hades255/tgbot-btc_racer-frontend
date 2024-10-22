import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import CopyIcon from "../../assets/icons/Copy";
import { useAuth } from "../../contexts/AuthContext";
import { addToast } from "../../redux/toastSlice";

const CopyBtn = () => {
  const { userId } = useAuth();
  const dispatch = useDispatch();

  const inviteLink = useMemo(
    () => `https://t.me/anom_invaders_bot/ANOM_Invaders?startapp=linkCode_${userId}`,
    [userId]
  );

  const copyToClipboard = useCallback(() => {
    const tempInput = document.createElement("input");
    tempInput.value = `${inviteLink}`;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    dispatch(
      addToast({
        message: "Your Invite URL is now copied to your clipboard!",
        type: "success",
      })
    );
  }, [inviteLink, dispatch]);

  return (
    <button
      onClick={copyToClipboard}
      className="bg-white text-black text-lg font-medium h-[50px] min-w-[50px] w-[50px] rounded-[25px] flex justify-center items-center"
    >
      <CopyIcon width={24} height={24} color={"#567"} />
    </button>
  );
};

export default CopyBtn;
