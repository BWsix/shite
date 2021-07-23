import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

import { Menu } from "./Menu";
import { useScroll } from "./useScroll";
import { UserIcon } from "../../components/hub";

import "./Navbar.css";
import "../../styles/button.css";

export const Navbar: React.FC = () => {
  const user = useContext(UserContext);

  const [toggle, setToggle] = useState(false);
  const scrollDown = useScroll();

  return (
    <div className={`Nav-outer ${scrollDown ? "" : "Nav-hide"}`}>
      <div className="Nav-inner">
        <Link to="/">
          <h1 className="Nav-h1">Shite.</h1>
        </Link>

        <div
          className="Menu-DropDown"
          onMouseEnter={() => setToggle(true)}
          onMouseLeave={() => setToggle(false)}
        >
          <UserIcon type="large" uid={user.uid} hover={true} />
          <Menu toggle={toggle} />
        </div>
      </div>
    </div>
  );
};
