import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import(
  `./colors/${
    localStorage.getItem("color") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
  }.css`
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
