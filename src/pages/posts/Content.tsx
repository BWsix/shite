import React, { useContext } from "react";

import { PostContext } from "./PostContent";

import "./Post.css";
import { ParseContent } from "../../components/ParseContent";

export const Content: React.FC = () => {
  const { post } = useContext(PostContext);

  return (
    <div className="Post-content">
      <ParseContent content={post.content} />
    </div>
  );
};
