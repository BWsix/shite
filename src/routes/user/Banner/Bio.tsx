import React, { useEffect, useState } from "react";

import { BioEditor } from "./BioEditor";
import { ParseContent } from "../../../components/hub";

import "./Banner.css";

interface BioProps {
  bio: string;
  isOwner: boolean;
}

export const Bio: React.FC<BioProps> = ({ bio, isOwner }) => {
  const [editedBio, setEditedBio] = useState(bio);
  const [toggleEditBio, setToggleEditBio] = useState(false);

  useEffect(() => {
    setEditedBio(bio.replaceAll("n_n_", "\n"));
  }, [bio]);
  return (
    <>
      {bio && !toggleEditBio && (
        <div className="Banner-bio">
          <div>
            <ParseContent content={bio} center={true} />
          </div>
        </div>
      )}
      {isOwner &&
        (toggleEditBio ? (
          <BioEditor
            editedBio={editedBio}
            setEditedBio={setEditedBio}
            setToggleEditBio={setToggleEditBio}
          />
        ) : (
          <div
            className="Banner-bio-edit"
            onClick={() => setToggleEditBio(true)}
          >
            <br />
            {bio ? "Edit Bio" : "Add Bio"}
          </div>
        ))}
    </>
  );
};
