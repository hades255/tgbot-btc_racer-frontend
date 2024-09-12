import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import { AuthProvider } from "./contexts/AuthContext";
import { SoundProvider } from "./contexts/SoundContext";
import Counter from "./helper/Counter";
import Coinapi from "./helper/Coinapi";
import { queryStringToObject } from "./helper/func";
import Race from "./pages/Race";
import Tasks from "./pages/Tasks";
import Invite from "./pages/Invite";
import Surprise from "./pages/Surprise";
import LeaderBoard from "./pages/LeaderBoard";
import Navbar from "./components/navbar";
import ToastContainer from "./components/common/toast";
import Congratulations from "./components/surprise/Congratulations";

const App = () => {
  const [str, setStr] = useState(null);
  
  useEffect(() => {
    const setTitle = () => {
      // const title = "Alphanomics";

      if (window.Telegram && window.Telegram.WebApp) {
        const initData = window.Telegram.WebApp.initData;
        setStr(queryStringToObject(initData));
        window.Telegram.WebApp.setHeaderColor("#0f1f39");
        // window.Telegram.WebApp.MainButton.setText(title);
        // window.Telegram.WebApp.MainButton.setParams({
        //   text_color: "#000713",
        //   color: "#0B1423",
        // });

        // window.Telegram.WebApp.MainButton.show();
      }
    };

    setTitle();
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <SoundProvider>
          <Counter />
          <Coinapi />
          <Router>
            <Routes>
              <Route path="/" element={<Race />} />
              <Route path="/race" element={<Race />} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/invite" element={<Invite />} />
              <Route path="/surprise" element={<Surprise />} />
            </Routes>
            <Navbar params={str} />
            <ToastContainer />
            <Congratulations />
          </Router>
        </SoundProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
