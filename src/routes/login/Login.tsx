import React from "react";

import { signIn, signInAnonymously } from "./auth";

import "./Login.css";
import "../../styles/button.css";

export const Login: React.FC = () => {
  return (
    <div className="Login">
      <h1 className="Login-title">Shite.</h1>
      <button className="btn-thick btn-round" onClick={signIn}>
        💩 Login with Google 💩
      </button>
      <button
        className="btn-thick btn-round btn-top"
        onClick={signInAnonymously}
      >
        💩 Login anonymously 💩
      </button>
    </div>
  );
};
