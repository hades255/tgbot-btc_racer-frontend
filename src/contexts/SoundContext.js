import React, { createContext, useContext, useState } from "react";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [sound, setSound] = useState(true);

  return (
    <SoundContext.Provider value={{ sound, setSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const usePlaySound = () => useContext(SoundContext);
