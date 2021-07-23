import React, { useContext, useState } from "react";
import { UserContext } from "../../../App";

import { PostContext } from "../PostContext";
import { updateShite } from "../functions/updateShite";

import "./Stats.css";

export const ShiteButton: React.FC = () => {
  const user = useContext(UserContext);
  const { post } = useContext(PostContext);

  const [shite, setShite] = useState(() => post.shiters.includes(user.uid));

  return (
    <button
      style={{ height: "100%", width: "90%" }}
      className={`ShiteCount-btn btn-sharp ${
        shite ? "ShiteCount-trigger" : ""
      }`}
      onClick={() => {
        updateShite(user.uid, post.postId, shite ? "unshite" : "shite");
        setShite((prev) => !prev);
      }}
      title={shite ? undefined : "give this post a shite!"}
    >
      {"💩 "}
      {post.shiters.length -
        (post.shiters.includes(user.uid) ? (shite ? 0 : 1) : shite ? -1 : 0)}
    </button>
  );
};
