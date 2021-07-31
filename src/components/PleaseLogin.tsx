import React from "react";

import { loginWithGoogle } from "../routes/login/auth";

import "../styles/button.css";

interface PleaseLoginProps {
  content: string;
}

export const PleaseLogin: React.FC<PleaseLoginProps> = ({ content }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button className="btn-thick btn-sharp" onClick={loginWithGoogle}>
        Login with Google and {content}
      </button>
    </div>
  );
};
