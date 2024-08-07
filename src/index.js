import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import BackgroundIcon from "./assets/icons/Background";
import PlanetIcon from "./assets/icons/background/Planet";
import Background from "./assets/icons/background/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="fixed top-0 -z-10">
      <PlanetIcon />
    </div>
    <div className="fixed top-64 -left-10 -z-10">
      <BackgroundIcon />
    </div>
    <div className="fixed top-0 -z-10">
      <Background />
    </div>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
