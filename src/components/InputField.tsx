import React, { useState } from "react";

import "./InputField.css";

interface InputFieldProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  rows?: number;
  publishButton?: React.MutableRefObject<HTMLButtonElement | null>;
  placeholder?: string;
  style?: React.CSSProperties;
}

export const InputField: React.FC<InputFieldProps> = ({
  content,
  setContent,
  rows,
  publishButton,
  placeholder = "What's on your mind, folk?",
  style,
}) => {
  const [content_lines, setRows] = useState(() => 1);

  return (
    <>
      <textarea
        value={content}
        rows={Math.max(content_lines + 1, rows || 3)}
        className="InputField"
        style={style}
        placeholder={
          publishButton ? "Enter: publish\nShift+Enter: new line" : placeholder
        }
        onChange={(evt) => {
          setContent(evt.target.value);
          setRows(evt.target.value.split("\n").length);
        }}
        onKeyDown={(evt) => {
          if (publishButton)
            if (evt.key === "Enter" && !evt.shiftKey) evt.preventDefault();
        }}
        onKeyUp={(evt) => {
          if (publishButton)
            if (evt.key === "Enter" && !evt.shiftKey)
              publishButton.current!.click();
        }}
      />
    </>
  );
};
