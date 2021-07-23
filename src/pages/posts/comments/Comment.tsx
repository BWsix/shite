import React from "react";
import { useUserInfo } from "../../../hooks/useUserInfo";

import { UserIcon } from "../../../components/UserIcon";
import { ParseContent } from "../../../components/ParseContent";

export interface CommentProps {
  commentId: string;
  author: string;
  content: string;
  createdAt: Date;
  postId: string;
  shiters: string[];
}

interface Props {
  cmt: CommentProps;
}

export const Comment: React.FC<Props> = ({ cmt }) => {
  const [name] = useUserInfo(cmt.author);

  return (
    <div className="Comment">
      <UserIcon type="small" uid={cmt.author} />

      <div className="Comment-text">
        <b style={{ color: "lightgrey" }}>{name} </b>
        <span style={{ color: "gray" }}>
          {cmt.createdAt.toLocaleDateString()}{" "}
          {cmt.createdAt.toLocaleTimeString()}
        </span>
        <ParseContent content={cmt.content} />
      </div>
    </div>
  );
};
