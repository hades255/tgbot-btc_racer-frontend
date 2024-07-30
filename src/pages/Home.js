import React from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/authSlice";

const Home = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
