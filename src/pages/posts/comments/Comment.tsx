import React, { useRef } from "react";

import { CommentProps } from "../types";
import { useUserInfo } from "../../../hooks/useUserInfo";
import { UserIcon, ParseContent } from "../../../components/hub";

import "./Comments.css";

interface Props {
  cmt: { comment: CommentProps; is_new: boolean };
  commentSectionRef: React.MutableRefObject<HTMLDivElement | null>;
  atBottom?: boolean;
}

export const Comment: React.FC<Props> = ({
  cmt,
  commentSectionRef,
  atBottom,
}) => {
  const commentBlock = useRef<HTMLDivElement | null>(null);
  const [name] = useUserInfo(cmt.comment.author);

  if (cmt.is_new && atBottom) {
    const cmtSection = commentSectionRef.current;

    if (cmtSection) {
      cmtSection.scrollTo(0, cmtSection.scrollHeight);
    }
  }

  return (
    <div
      ref={commentBlock}
      className={`Comment ${cmt.is_new ? "Comment-new" : ""}`}
    >
      <UserIcon type="small" uid={cmt.comment.author} />

      <div className="Comment-text">
        <b className="Comment-name">{name} </b>
        <span className="Comment-time">
          {cmt.comment.createdAt.toLocaleDateString()}{" "}
          {cmt.comment.createdAt.toLocaleTimeString()}
        </span>
        <ParseContent content={cmt.comment.content} />
      </div>
    </div>
  );
};
