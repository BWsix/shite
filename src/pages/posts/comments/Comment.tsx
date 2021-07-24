import React from "react";

import { CommentProps } from "../types";
import { useUserInfo } from "../../../hooks/useUserInfo";
import { UserIcon, ParseContent } from "../../../components/hub";

import "./Comments.css";

interface Props {
  cmt: CommentProps;
}

export const Comment: React.FC<Props> = ({ cmt }) => {
  const [name] = useUserInfo(cmt.author);

  return (
    <div className="Comment">
      <UserIcon type="small" uid={cmt.author} />

      <div className="Comment-text">
        <b className="Comment-name">{name} </b>
        <span className="Comment-time">
          {cmt.createdAt.toLocaleDateString()}{" "}
          {cmt.createdAt.toLocaleTimeString()}
        </span>
        <ParseContent content={cmt.content} />
      </div>
    </div>
  );
};
