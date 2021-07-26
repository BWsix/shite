import React from "react";

import { Status } from "../../../components/hub";
import { useUserInfo } from "../../../hooks/useUserInfo";

import "./Banner.css";
import { Bio } from "./Bio";
import { Cover } from "./Cover";

interface BannerProps {
  uid: string;
  isOwner: boolean;
}

export const Banner: React.FC<BannerProps> = ({ uid, isOwner }) => {
  const { name, avatar, bio, cover, error } = useUserInfo(uid, true);

  if (error) return <Status content="error" />;

  return (
    <div className="Banner">
      <div className="Banner-upper">
        <Cover uid={uid} isOwner={isOwner} cover={cover} />
      </div>

      <div className="Banner-lower">
        <img src={avatar} alt="user's avatar" className="Banner-avatar" />

        <h1 className="Banner-name">{name}</h1>

        <Bio bio={bio} isOwner={isOwner} />
      </div>
    </div>
  );
};
