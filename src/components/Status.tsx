import React from "react";

interface statusProps {
  content: "loading" | "error" | string;
}

export const Status: React.FC<statusProps> = ({ content }) => {
  let script = "";

  if (content === "loading") {
    script = "Loading...";
  } else if (content === "error") {
    script = "Error.";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "60px",
      }}
    >
      <span style={{ textAlign: "center" }}>
        💩 {script.length ? script : content} 💩
      </span>
    </div>
  );
};
