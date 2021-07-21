import React, { useState } from "react";

import { UserIcon, InputField } from "../../components/hub";
import { publishPost } from "../../functions/publishPost";

import "./MakePost.css";
import "../../styles/button.css";
import "../../pages/posts/Post.css";

interface MakePostProps {
  uid: string;
}

export const MakePost: React.FC<MakePostProps> = ({ uid }) => {
  const [content, setContent] = useState("");

  const handle_publish = () => {
    if (!content.trim().length) {
      return setContent("");
    }
    publishPost(content.trim(), uid);
    setContent("");
  };

  return (
    <div className="Post-outer">
      <div className="Post">
        <UserIcon type="large" uid={uid} withName={true} />

        <div className="Post-content">
          <div style={{ marginBottom: "10px" }}>
            <InputField content={content} setContent={setContent} rows={4} />
          </div>

          {/*this class disappears when deployed to firebase hosting. wtf???*/}
          <div className="MakePost-button-set">
            <button className="btn-thin btn-sharp" onClick={handle_publish}>
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
