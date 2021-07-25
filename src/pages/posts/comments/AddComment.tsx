import React, { useState, useRef, useContext } from "react";
import { UserContext } from "../../../App";

import { publishComment } from "../functions/hub";
import { InputField, UserIcon } from "../../../components/hub";

import "./Comments.css";

interface AddCommentProps {
  postId: string;
}

export const AddComment: React.FC<AddCommentProps> = ({ postId }) => {
  const user = useContext(UserContext);

  const [content, setContent] = useState("");
  const publishButton = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="AddComment Comment">
      <UserIcon type="small" uid={user.uid} />

      <div
        style={{
          width: "100%",
          paddingLeft: "10px",
        }}
      >
        <b>{user.displayName}</b>
        <div style={{ width: "100%" }}>
          <InputField
            content={content}
            setContent={setContent}
            publishButton={publishButton}
          />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: "10px",
          }}
        >
          <button
            style={{ display: "none" }}
            ref={publishButton}
            onClick={() => {
              if (!content.trim().length) {
                return setContent("");
              }
              publishComment(content!, user.uid, postId);
              setContent("");
            }}
          />
        </div>
      </div>
    </div>
  );
};
