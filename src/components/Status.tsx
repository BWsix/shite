import React from "react";

interface statusProps {
  content: string;
}

export const Status: React.FC<statusProps> = ({ content }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "60px",
      }}
    >
      <span style={{ textAlign: "center" }}>💩 {content} 💩</span>
    </div>
  );
};
