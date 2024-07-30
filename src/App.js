import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Race from "./pages/Race";
import LeaderBoard from "./pages/LeaderBoard";
import Tasks from "./pages/Tasks";
import Invite from "./pages/Invite";
import Surprise from "./pages/Surprise";

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/race" element={<Race />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/invite" element={<Invite />} />
            <Route path="/surprise" element={<Surprise />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
