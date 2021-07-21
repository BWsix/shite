import React, { useState } from "react";

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
          <InputField content={content} setContent={setContent} />
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
            onClick={() => {
              if (!content.length) return;
              publishComment(content, uid, postId);
              setContent("");
            }}
          >
            publish
          </button>
        </div>
      </div>
    </div>
  );
};
