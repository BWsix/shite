import React from "react";

import "./Stats.css";

interface ToggleCommentsProps {
  setToggleComments: React.Dispatch<React.SetStateAction<boolean>>;
  commentCount: number;
}

export const ToggleComments: React.FC<ToggleCommentsProps> = ({
  setToggleComments,
  commentCount,
}) => {
  return (
    <button
      style={{ height: "100%", width: "90%" }}
      className={`btn-sharp ${commentCount ? "" : "ShiteCount-btn"}`}
      onClick={() => setToggleComments(true)}
    >
      comments {commentCount}
    </button>
  );
};
