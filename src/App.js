import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Buffer } from "buffer";

import store from "./redux/store";
import { AuthProvider } from "./contexts/AuthContext";
import { SoundProvider } from "./contexts/SoundContext";
import Counter from "./helper/Counter";
import Coinapi from "./helper/Coinapi";
import { queryStringToObject } from "./helper/func";
import LoadingIcon from "./assets/icons/loading";
import Navbar from "./components/navbar";
import ToastContainer from "./components/common/toast";
import Congratulations from "./components/surprise/Congratulations";
const Race = lazy(() => import("./pages/Race"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Invite = lazy(() => import("./pages/Invite"));
const Surprise = lazy(() => import("./pages/Surprise"));
const LeaderBoard = lazy(() => import("./pages/LeaderBoard"));

window.Buffer = Buffer; // Make Buffer available globally

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
            <Suspense
              fallback={
                <div className="fixed top-0 left-0 z-20 w-full h-screen bg-[#000000] opacity-80 flex justify-center items-center">
                  <div className="animate-spin">
                    <LoadingIcon />
                  </div>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Race />} />
                <Route path="/race" element={<Race />} />
                <Route path="/leaderboard" element={<LeaderBoard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/invite" element={<Invite />} />
                <Route path="/surprise" element={<Surprise />} />
              </Routes>
            </Suspense>
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
