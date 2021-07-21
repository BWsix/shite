import React from "react";
import { Link } from "react-router-dom";

import firebase from "firebase/app";

import { signOut } from "../login/auth";
import { clear_cache } from "../../functions/_local";
import { updateUser } from "../../functions/updateUser";

import "./Navbar.css";

interface MenuProps {
  user: firebase.User;
  toggle: boolean;
}

export const Menu: React.FC<MenuProps> = ({ user, toggle }) => {
  const handle_signOut = () => {
    updateUser(user);
    signOut();
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
        onClick={clear_cache}
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
