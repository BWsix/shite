import React from "react";
import { v4 } from "uuid";
import { UserIcon } from "../../../components/UserIcon";
import { useUserInfo } from "../../../hooks/useUserInfo";

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
        {cmt.content.split("n_n_").map((line) => (
          <div key={v4()} style={{ display: "flex", flexWrap: "wrap" }}>
            {line.split(" ").map((word) => (
              <span
                key={v4()}
                style={{
                  maxWidth: "555px",
                  wordWrap: "break-word",
                }}
              >
                {word + String.fromCharCode(160)}
              </span>
            ))}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};
