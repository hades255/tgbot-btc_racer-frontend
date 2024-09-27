import React from "react";
import ReactDOM from "react-dom/client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import BackgroundIcon from "./assets/icons/Background";
import PlanetIcon from "./assets/icons/background/Planet";
import Background from "./assets/icons/background/index";

const manifestUrl = "https://anomgaming.online/tonconnect-manifest.json";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TonConnectUIProvider
    manifestUrl={manifestUrl}
    actionsConfiguration={{ twaReturnUrl: "https://t.me/anom_invaders_bot" }}
  >
    <React.StrictMode>
      <div className="fixed top-0 left-0 w-full -z-10 flex justify-center">
        <PlanetIcon />
      </div>
      <div className="fixed top-64 -left-10 w-full flex justify-center -z-10">
        <BackgroundIcon />
      </div>
      <div className="fixed top-0 left-0 w-full flex justify-center -z-10">
        <Background />
      </div>
      <App />
    </React.StrictMode>
  </TonConnectUIProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
