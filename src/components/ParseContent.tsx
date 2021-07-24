import React from "react";
import { v4 } from "uuid";

import "./ParseContent.css";

interface ParseContentProps {
  content: string;
}

export const ParseContent: React.FC<ParseContentProps> = ({ content }) => {
  return (
    <>
      {content.split("n_n_").map((line) => (
        <div key={v4()} className="ParseContent-line">
          {line.split(" ").map((word) => (
            <span key={v4()} className="ParseContent-word">
              {word.startsWith("https://") || word.startsWith("http://") ? (
                <a href={word} className="ParseContent-url">
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