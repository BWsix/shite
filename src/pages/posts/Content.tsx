import React from "react";
import { v4 } from "uuid";

import { PostProps } from "./Post";

import "./Post.css";

interface ContentProps {
  post: PostProps;
}

export const Content: React.FC<ContentProps> = ({ post }) => {
  return (
    <div className="Post-content">
      {post.content.split("n_n_").map((line) => (
        <div key={v4()} style={{ display: "flex", flexWrap: "wrap" }}>
          {line.split(" ").map((word) => (
            <span key={v4()} style={{ display: "inline-block" }}>
              {word + String.fromCharCode(160)}
            </span>
          ))}
          <br />
        </div>
      ))}
    </div>
  );
};
