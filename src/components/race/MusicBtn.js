import React, { useCallback } from "react";
import MusicIcon from "../../assets/icons/Music";
import MusicOffIcon from "../../assets/icons/MusicOff";
import { usePlaySound } from "../../contexts/SoundContext";

const MusicBtn = () => {
  const { sound, setSound } = usePlaySound();

  const handleClick = useCallback(() => setSound(!sound), [sound, setSound]);

  return (
    <div onClick={handleClick} className="hover:cursor-pointer">
      {sound ? (
        <MusicIcon width={16} height={16} color={"white"} />
      ) : (
        <MusicOffIcon width={16} height={16} color={"white"} />
      )}
    </div>
  );
};

export default MusicBtn;
