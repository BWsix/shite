import React, { useContext } from "react";

import { PostContext } from "../PostContext";
import { ParseContent } from "../../../components/hub";

import "../Post.css";

export const Content: React.FC = () => {
  const { post } = useContext(PostContext);

  return (
    <div className="Post-content">
      <ParseContent content={post.content} markdown={post.markdown} />
    </div>
  );
};
