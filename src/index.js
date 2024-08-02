import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import BackgroundIcon from "./assets/icons/Background";
import StarsIcon from "./assets/icons/Stars";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="absolute top-1 -z-10">
      <BackgroundIcon />
    </div>
    <div className="absolute top-0 -z-10">
      <StarsIcon width={360} height={400} color={"white"} />
    </div>
    <div className="absolute top-60 -z-10">
      <StarsIcon width={360} height={400} color={"white"} />
    </div>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
