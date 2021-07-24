import React, { useState, useContext } from "react";
import { UserContext } from "../../App";

import { UserIcon, InputField } from "../../components/hub";
import { publishPost } from "./publishPost";

import "../../styles/button.css";
import "../../pages/posts/Post.css";
import { ImageUploader } from "./ImageUploader";

export const MakePost: React.FC = () => {
  const user = useContext(UserContext);

  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handle_publish = () => {
    if (!content.trim().length && !image) {
      return setContent("");
    }
    publishPost(user.uid, content.trim(), image);
    setContent("");
    setImage("");
  };

  return (
    <div
      className="Post-outer"
      style={{
        width: "100%",
        margin: "calc(1vh + 15px) 0",
        borderRadius: "10px",
      }}
    >
      <div style={{ padding: "10px" }}>
        <UserIcon type="large" uid={user.uid} withName={true} />

        <div className="Post-content">
          <div style={{ marginBottom: "10px" }}>
            <InputField content={content} setContent={setContent} rows={4} />
          </div>

          {/*this class disappears when deployed to firebase hosting. wtf???*/}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ImageUploader image_str={image} setImage_str={setImage} />

            <button className="btn-thin btn-sharp" onClick={handle_publish}>
              Publish
            </button>
          </div>
        </div>
      </div>

      {image && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={image}
            alt="img"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};
