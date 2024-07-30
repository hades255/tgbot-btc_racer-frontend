import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);