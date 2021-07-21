import React from "react";

import { signIn } from "./auth";

import "./Login.css";
import "../../styles/button.css";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  return (
    <div className="Login">
      <h1 className="Login-title">Shite.</h1>
      <button className="btn-thick btn-round" onClick={signIn}>
        💩 Login with Google 💩
      </button>
    </div>
  );
};
