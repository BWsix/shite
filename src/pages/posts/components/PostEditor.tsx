import React from "react";

import { InputField } from "../../../components/hub";

interface PostEditorProps {
  editedContent: string;
  setEditedContent: React.Dispatch<React.SetStateAction<string>>;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  editedContent,
  setEditedContent,
}) => {
  return (
    <div className="Post-content" style={{ marginBottom: "10px" }}>
      <InputField
        content={editedContent}
        setContent={setEditedContent}
        rows={Math.max(editedContent.split("\n").length + 1, 4)}
      />
    </div>
  );
};
