import React from "react";
import { useState } from "react";

interface SharePostProps {
  postId: string;
}

export const SharePost: React.FC<SharePostProps> = ({ postId }) => {
  const [content, setContent] = useState("share");

  return (
    <button
      className="btn-thin btn-round btn-left"
      title="copy to clipboard"
      onClick={() => {
        navigator.clipboard.writeText(
          window.location.origin + "/post/" + postId
        );
        setContent("copied!");
      }}
    >
      <small>{content}</small>
    </button>
  );
};
