import React, { useState } from "react";

import { updateCover } from "./updateBanner";
import { ImageUploader } from "../../main/ImageUploader";

import "./Banner.css";

interface CoverProps {
  uid: string;
  isOwner: boolean;
  cover: string;
}

export const Cover: React.FC<CoverProps> = ({ uid, isOwner, cover }) => {
  const [cover_str, setCover_str] = useState("");

  return (
    <>
      <div className={`Banner-cover-edit${cover_str.length ? "-confirm" : ""}`}>
        {isOwner && (
          <>
            {" "}
            <ImageUploader
              image_str={cover_str}
              setImage_str={setCover_str}
              title="Edit Cover"
              title_cancel="Cancel"
            />
            {cover_str.length ? (
              <button
                className="btn-thin btn-sharp btn-left"
                onClick={() => {
                  updateCover(uid, cover_str);
                }}
              >
                Upload
              </button>
            ) : undefined}
          </>
        )}
      </div>
      <img
        src={cover_str.length ? cover_str : cover}
        alt="user's cover"
        className="Banner-cover"
      />
    </>
  );
};
