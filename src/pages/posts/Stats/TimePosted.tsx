import React from "react";

import "./Stats.css";
import "../Post.css";

interface TimePostedProps {
  createdAt: Date;
}

export const TimePosted: React.FC<TimePostedProps> = ({ createdAt }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        color: "gray",
      }}
    >
      <span style={{ display: "inline-block" }}>
        {createdAt.toLocaleDateString()}
        {", "}
      </span>
      <span style={{ display: "inline-block" }}>
        {createdAt.toLocaleTimeString()}
      </span>
    </div>
  );
};
