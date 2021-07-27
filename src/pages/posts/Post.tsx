import React, { useState, useEffect, useContext } from "react";

import { PostContext } from "./PostContext";
import { UserContext } from "../../App";

import { PostProps } from "./types";
import { Content, Stats, Options, PostEditor } from "./hub";
import { Comments } from "./comments/Comments";
import { SharePost } from "./components/SharePost";
import { UserIcon } from "../../components/hub";

import "./Post.css";
import "../../styles/button.css";

interface Props {
  _post: PostProps;
  redirect?: boolean;
}

export const Post: React.FC<Props> = ({ _post, redirect }) => {
  const user = useContext(UserContext);

  const [editedContent, setEditedContent] = useState("");
  const [toggleComments, setToggleComments] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

  const [post, setPost] = useState(() => _post);
  useEffect(() => {
    setPost(_post);
    setEditedContent(_post.content.replaceAll("n_n_", "\n"));
  }, [_post]);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      <div
        className="Post-outer"
        style={{
          width: "100%",
          margin: "calc(1vh + 15px) 0",
          borderRadius: "10px",
        }}
      >
        <div style={{ padding: "10px" }}>
          <div className="Post-content-upper">
            <UserIcon
              type="large"
              uid={post.author}
              withName={true}
              redirect={redirect === false ? undefined : true}
              hover={redirect === false ? undefined : true}
            />

            <div style={{ display: "flex" }}>
              {user.uid === post.author && (
                <Options
                  toggleEdit={toggleEdit}
                  setToggleEdit={setToggleEdit}
                  editedContent={editedContent}
                />
              )}
              <SharePost postId={post.postId} />
            </div>
          </div>

          {toggleEdit ? (
            <PostEditor
              editedContent={editedContent}
              setEditedContent={setEditedContent}
            />
          ) : (
            <Content />
          )}
        </div>

        {post.image && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={post.image}
              alt="just an img"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}

        <div className="Post-strike" />

        <Stats setToggleComments={setToggleComments} />

        {toggleComments && (
          <>
            <div className="Post-strike" />
            <Comments />
          </>
        )}
      </div>
    </PostContext.Provider>
  );
};
