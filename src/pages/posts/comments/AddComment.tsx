import React, { useState, useRef } from "react";

import { InputField, UserIcon } from "../../../components/hub";
import { publishComment } from "../../../functions/publishComment";

import "./Comments.css";

interface AddCommentProps {
  uid: string;
  postId: string;
  name: string;
}

export const AddComment: React.FC<AddCommentProps> = ({
  uid,
  postId,
  name,
}) => {
  const [content, setContent] = useState("");
  const publishButton = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="AddComment Comment">
      <UserIcon type="small" uid={uid} />

      <div
        style={{
          width: "100%",
          paddingLeft: "10px",
        }}
      >
        <b>{name}</b>
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
            className="btn-thin btn-sharp"
            ref={publishButton}
            onClick={() => {
              if (!content.trim().length) {
                return setContent("");
              }
              publishComment(content!, uid, postId);
              setContent("");
            }}
          >
            comment
          </button>
        </div>
      </div>
    </div>
  );
};
