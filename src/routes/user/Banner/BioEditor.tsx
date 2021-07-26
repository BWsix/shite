import React, { useContext } from "react";
import { updateBio } from "./updateBanner";
import { UserContext } from "../../../App";
import { InputField } from "../../../components/InputField";

interface BioEditorProps {
  editedBio: string;
  setEditedBio: React.Dispatch<React.SetStateAction<string>>;
  setToggleEditBio: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BioEditor: React.FC<BioEditorProps> = ({
  editedBio,
  setEditedBio,
  setToggleEditBio,
}) => {
  const user = useContext(UserContext);

  return (
    <div className="Banner-BioEditor">
      <InputField
        content={editedBio}
        setContent={setEditedBio}
        placeholder="Describe who you are"
        rows={5}
        style={{ textAlign: "center" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          className="btn-top btn-thin btn-sharp"
          onClick={() => setToggleEditBio(false)}
        >
          cancel
        </button>
        <button
          className="btn-top btn-thin btn-sharp btn-left"
          onClick={() => {
            updateBio(user.uid, editedBio);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};
