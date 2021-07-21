import React from "react";
import { useState } from "react";

import "./InputField.css";

interface InputFieldProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  rows?: number;
}

export const InputField: React.FC<InputFieldProps> = ({
  content,
  setContent,
  rows,
}) => {
  const [content_lines, setRows] = useState(() => 1);

  return (
    <textarea
      rows={Math.max(content_lines + 1, rows || 3)}
      placeholder="say something..."
      value={content}
      onChange={(evt) => {
        setContent(evt.target.value);
        setRows(evt.target.value.split("\n").length);
      }}
      className="InputField"
    />
  );
};
