import React, { useState, useEffect } from "react";

import { BioEditor } from "./BioEditor";
import { ParseContent, Status } from "../../../components/hub";
import { useUserInfo } from "../../../hooks/useUserInfo";

import "./Banner.css";

interface BannerProps {
  uid: string;
  isOwner: boolean;
}

export const Banner: React.FC<BannerProps> = ({ uid, isOwner }) => {
  const { name, avatar, bio, cover, error } = useUserInfo(uid, true);

  const [editedBio, setEditedBio] = useState(bio);
  const [toggleEditBio, setToggleEditBio] = useState(false);

  useEffect(() => {
    setEditedBio(bio.replaceAll("n_n_", "\n"));
  }, [bio]);

  if (error) return <Status content="error" />;

  return (
    <div className="Banner">
      <div className="Banner-upper">
        <img src={cover} alt="user's cover" className="Banner-cover" />
      </div>

      <div className="Banner-lower">
        <img src={avatar} alt="user's avatar" className="Banner-avatar" />

        <h1 className="Banner-name">{name}</h1>

        {bio && !toggleEditBio && (
          <div className="Banner-bio">
            <div>
              <ParseContent content={bio} center={true} />
            </div>
          </div>
        )}

        {bio &&
          isOwner &&
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
      </div>
    </div>
  );
};
