import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./contexts/AuthContext";
import Race from "./pages/Race";
import LeaderBoard from "./pages/LeaderBoard";
import Tasks from "./pages/Tasks";
import Invite from "./pages/Invite";
import Surprise from "./pages/Surprise";
import Navbar from "./components/navbar";
import FuelCounter from "./helper/FuelCounter";
import ToastContainer from "./components/common/toast";

const App = () => {
  useEffect(() => {
    const setTitle = () => {
      const title = "Alphanomics";

      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.setHeaderColor("#0B1423");
        window.Telegram.WebApp.MainButton.setText(title);
        window.Telegram.WebApp.MainButton.setParams({
          text_color: "#000713",
          color: "#0B1423",
        });

        window.Telegram.WebApp.MainButton.show();
      }
    };

    setTitle();
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <FuelCounter />
        <Router>
          <Routes>
            <Route path="/" element={<Race />} />
            <Route path="/race" element={<Race />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/invite" element={<Invite />} />
            <Route path="/surprise" element={<Surprise />} />
          </Routes>
          <Navbar />
          <ToastContainer />
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
