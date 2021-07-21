import React, { useState } from "react";

import { updateShite } from "../../../functions/updateShite";

import "./Stats.css";

interface ShiteButtonProps {
  shiters: string[];
  uid: string;
  postId: string;
}

export const ShiteButton: React.FC<ShiteButtonProps> = ({
  shiters,
  uid,
  postId,
}) => {
  const [shite, setShite] = useState(() => shiters.includes(uid));

  return (
    <button
      style={{ height: "100%", width: "90%" }}
      className={`ShiteCount-btn btn-sharp ${
        shite ? "ShiteCount-trigger" : ""
      }`}
      onClick={() => {
        updateShite(uid, postId, shite ? "unshite" : "shite");
        setShite((prev) => !prev);
      }}
      title={shite ? undefined : "give this post a shite!"}
    >
      {"💩 "}
      {shiters.length -
        (shiters.includes(uid) ? (shite ? 0 : 1) : shite ? -1 : 0)}
    </button>
  );
};
