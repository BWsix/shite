import React, { useState, useContext } from "react";
import Resizer from "react-image-file-resizer";

import { publishPost } from "./publishPost";
import { ImageUploader } from "./ImageUploader";
import { UserContext } from "../../App";
import { UserIcon, InputField } from "../../components/hub";

import "../../styles/button.css";
import "../../pages/posts/Post.css";
import "../../pages/posts/Stats/Stats.css";

export const MakePost: React.FC = () => {
  const user = useContext(UserContext);

  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [markdown, setMarkdown] = useState(false);

  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        650,
        750,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const handle_publish = () => {
    if (!content.trim().length && !image) {
      return setContent("");
    }
    publishPost(user.uid, content, image, markdown);
    setContent("");
    setImage("");
    setMarkdown(false);
  };

  return (
    <div
      className="Post-outer"
      style={{
        width: "100%",
        margin: "calc(1vh + 15px) 0",
        borderRadius: "10px",
      }}
      onPaste={async (evt) => {
        if (!evt.clipboardData.files[0]) return;

        const file = evt.clipboardData.files[0];
        const image = await resizeFile(file);
        setImage(image as string);
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

            <div style={{ display: "flex" }}>
              <button
                className={`btn-thin btn-sharp ShiteCount-${
                  markdown ? "trigger" : "btn"
                }`}
                onClick={() => setMarkdown((prev) => !prev)}
              >
                markdown({markdown ? "o" : "x"})
              </button>
              <button
                className="btn-thin btn-sharp btn-left"
                onClick={handle_publish}
              >
                Publish
              </button>
            </div>
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
