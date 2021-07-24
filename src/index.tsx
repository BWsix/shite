import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import(`./colors/${localStorage.getItem("color") || "dark"}.css`);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
