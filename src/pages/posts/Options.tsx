import React, { useContext } from "react";

import { PostContext } from "./PostContent";
import { editPost } from "../../functions/editPost";
import { UserContext } from "../../App";
import { deletePost } from "../../functions/deletePost";

interface OptionsProps {
  toggleEdit: boolean;
  setToggleEdit: React.Dispatch<React.SetStateAction<boolean>>;
  editedContent: string;
}

export const Options: React.FC<OptionsProps> = ({
  toggleEdit,
  setToggleEdit,
  editedContent,
}) => {
  const user = useContext(UserContext);
  const { post } = useContext(PostContext);

  return (
    <div style={{ display: "flex" }}>
      {toggleEdit ? (
        <>
          <button
            className="btn-thin btn-round"
            onClick={() => setToggleEdit(false)}
          >
            cancel
          </button>
          <button
            className="btn-thin btn-round btn-left"
            onClick={() => {
              if (!editedContent.trim().length) return;
              editPost(post, editedContent.trim());
              setToggleEdit(false);
            }}
          >
            save
          </button>
        </>
      ) : (
        <>
          <button
            className="btn-thin btn-round"
            onClick={() => {
              setToggleEdit(true);
            }}
          >
            edit
          </button>
          <button
            className="btn-thin btn-round btn-left"
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              if (confirm("delete this post?")) {
                deletePost(post.postId, user.uid);
              }
            }}
          >
            delete
          </button>
        </>
      )}
    </div>
  );
};
