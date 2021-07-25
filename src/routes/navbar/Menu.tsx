import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

import { signOut } from "../login/auth";
import { updateUser, switch_theme } from "../../functions/hub";

import "./Navbar.css";

interface MenuProps {
  toggle: boolean;
}

export const Menu: React.FC<MenuProps> = ({ toggle }) => {
  const user = useContext(UserContext);

  const handle_signOut = () => {
    updateUser(user);
    signOut();
  };

  const handle_color = () => {
    const selectedColor = localStorage.getItem("color");
    const systemColor = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    console.log(selectedColor);
    console.log(systemColor);

    if (selectedColor) return selectedColor === "dark" ? "light" : "dark";
    return systemColor === "dark" ? "light" : "dark";
  };

  return (
    <div
      className="Menu-DropDown-Items"
      style={{ display: !toggle ? "none" : "" }}
    >
      <button className="btn-thin btn-sharp btn-top btn-border">
        <Link to={`/user/${user.uid}`}>My posts</Link>
      </button>

      <button
        className="btn-thin btn-sharp btn-top btn-border"
        onClick={() => switch_theme(handle_color())}
      >
        {handle_color()} mode
      </button>

      <button
        className="btn-thin btn-sharp btn-top btn-border"
        onClick={() => localStorage.clear()}
      >
        Clear cache
      </button>

      <button
        className="btn-thin btn-sharp btn-top btn-border"
        onClick={handle_signOut}
      >
        Logout
      </button>
    </div>
  );
};
