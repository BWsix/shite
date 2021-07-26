import React from "react";
import { Link } from "react-router-dom";

import { useUserInfo } from "../hooks/useUserInfo";

import "./UserIcon.css";

interface UserIconProps {
  type: "small" | "large";
  uid: string;
  redirect?: true;
  withName?: true;
  hover?: true;
}

export const UserIcon: React.FC<UserIconProps> = ({
  type,
  uid,
  redirect,
  withName,
  hover,
}) => {
  const { name, avatar } = useUserInfo(uid);

  const size = (() => {
    if (type === "small") return 35;
    if (type === "large") return 55;
  })();

  let content = (
    <img
      src={avatar}
      alt={name}
      className={hover ? "UserIcon UserIcon-hover" : "UserIcon"}
      title={redirect ? "go to " + name + "' page" : undefined}
      style={{ width: size, height: size }}
    />
  );

  if (redirect) {
    content = <Link to={`/user/${uid}`}>{content}</Link>;
  }

  if (withName) {
    content = (
      <div className="UserIcon-withName">
        {content}
        <div className="UserIcon-Name">
          <b>{name}</b>
        </div>
      </div>
    );
  }

  return content;
};
