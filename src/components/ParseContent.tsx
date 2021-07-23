import React from "react";
import { v4 } from "uuid";

interface ParseContentProps {
  content: string;
}

export const ParseContent: React.FC<ParseContentProps> = ({ content }) => {
  const lineStyles = { display: "flex" }; // flexWrap: "wrap" causes ts(2322) for some reason
  const linkStyles = { textDecoration: "underline", color: "lightblue" };

  return (
    <>
      {content.split("n_n_").map((line) => (
        <div key={v4()} style={{ ...lineStyles, flexWrap: "wrap" }}>
          {line.split(" ").map((word) => (
            <span
              key={v4()}
              style={{
                maxWidth: "100%",
                wordWrap: "break-word",
              }}
            >
              {word.startsWith("https://") || word.startsWith("http://") ? (
                <a href={word} style={linkStyles}>
                  {word + String.fromCharCode(160)}
                </a>
              ) : (
                word + String.fromCharCode(160)
              )}
            </span>
          ))}
          <br />
        </div>
      ))}
    </>
  );
};
