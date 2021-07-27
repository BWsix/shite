import React from "react";
import ReactMarkdown from "react-markdown";
import { v4 } from "uuid";

import "./ParseContent.css";

interface ParseContentProps {
  content: string;
  center?: true;
  markdown?: boolean;
}

export const ParseContent: React.FC<ParseContentProps> = ({
  content,
  center,
  markdown,
}) => {
  return (
    <>
      {markdown ? (
        <div className="ParseContent-url">
          <ReactMarkdown children={content.replaceAll("n_n_", "\n\n&nbsp;")} />
        </div>
      ) : (
        content.split("n_n_").map((line) => (
          <div
            key={v4()}
            className="ParseContent-line ParseContent-url"
            style={center && { display: "flex", justifyContent: "center" }}
          >
            {line.split(" ").map((word) => (
              <span key={v4()} className="ParseContent-word">
                {word.startsWith("https://") || word.startsWith("http://") ? (
                  <a href={word}>{word + String.fromCharCode(160)}</a>
                ) : (
                  word + String.fromCharCode(160)
                )}
              </span>
            ))}
            <br />
          </div>
        ))
      )}
    </>
  );
};
