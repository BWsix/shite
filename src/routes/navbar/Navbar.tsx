import React, { useState } from "react";
import { Link } from "react-router-dom";

import firebase from "firebase/app";

import { Menu } from "./Menu";
import { UserIcon } from "../../components/hub";
import { useScroll } from "../../hooks/useScroll";

import "./Navbar.css";
import "../../styles/button.css";

interface NavbarProps {
  user: firebase.User;
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [toggle, setToggle] = useState(false);
  const scrollDown = useScroll();

  return (
    <div className={`Nav-outer ${scrollDown ? "" : "Nav-hide"}`}>
      <div className="Nav-inner">
        <Link to="/">
          <h1 className="Nav-h1">Shite.</h1>
          {scrollDown}
        </Link>

        <div
          className="Menu-DropDown"
          onMouseEnter={() => setToggle(true)}
          onMouseLeave={() => setToggle(false)}
        >
          <UserIcon type="large" uid={user.uid} hover={true} />
          <Menu user={user} toggle={toggle} />
        </div>
      </div>
    </div>
  );
};
