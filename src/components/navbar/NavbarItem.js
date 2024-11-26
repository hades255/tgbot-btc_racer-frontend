import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import { usePlaySound } from "@contexts/SoundContext";
import buttonSfx from "@audios/button.mp3";

const NavbarItem = ({ title, icon, url, active }) => {
  const navigate = useNavigate();
  const { sound } = usePlaySound();
  const [playButtonSfx] = useSound(buttonSfx, { soundEnabled: sound });

  const handleClick = useCallback(() => {
    playButtonSfx();
    navigate(url);
  }, [navigate, url, playButtonSfx]);

  return (
    <div
      className="flex flex-col w-1/5 h-full justify-start pt-3 align-middle hover:cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-center">{icon}</div>
      <div className="mt-2 flex justify-center">
        <span
          className={`text-[11px] ${
            active ? "text-white font-bold" : "text-zinc-400"
          }`}
        >
          {title}
        </span>
      </div>
    </div>
  );
};

export default NavbarItem;
