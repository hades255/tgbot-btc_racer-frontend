import React, { useCallback, useState } from "react";
import MusicIcon from "../../assets/icons/Music";
import MusicOffIcon from "../../assets/icons/MusicOff";

const MusicBtn = () => {
  const [music, setMusic] = useState(true);

  const handleClick = useCallback(() => setMusic(!music), [music]);

  return (
    <div onClick={handleClick} className="hover:cursor-pointer">
      {music ? (
        <MusicIcon width={16} height={16} color={"white"} />
      ) : (
        <MusicOffIcon width={16} height={16} color={"white"} />
      )}
    </div>
  );
};

export default MusicBtn;
