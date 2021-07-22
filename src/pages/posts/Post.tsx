import React, { useState } from "react";

import { Content, Stats } from "./hub";
import { PostEditor } from "./PostEditor";
import { Comments } from "./comments/Comments";
import { UserIcon } from "../../components/UserIcon";
import { deletePost } from "../../functions/deletePost";
import { editPost } from "../../functions/editPost";

import "./Post.css";
import "../../styles/button.css";

export interface PostProps {
  postId: string;
  author: string;
  content: string;
  shiters: string[];
  createdAt: Date;
  comments: string[];
}

interface Props {
  post: PostProps;
  uid: string;
  name: string;
}

export const Post: React.FC<Props> = ({ post, uid, name }) => {
  const [toggleComments, setToggleComments] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [editedContent, setEditedContent] = useState(
    post.content.replaceAll("n_n_", "\n")
  );

  return (
    <div className="Post-outer">
      <div className="Post">
        <div className="Post-content-upper">
          <UserIcon type="large" uid={post.author} withName={true} />
          {uid === post.author &&
            (toggleEdit ? (
              <div style={{ display: "flex" }}>
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
              </div>
            ) : (
              <div style={{ display: "flex" }}>
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
                  onClick={() => deletePost(post.postId)}
                >
                  delete
                </button>
              </div>
            ))}
        </div>

        {toggleEdit ? (
          <PostEditor
            editedContent={editedContent}
            setEditedContent={setEditedContent}
          />
        ) : (
          <Content post={post} />
        )}
      </div>

      <div className="Post-strike" />

      <Stats post={post} uid={uid} setToggleComments={setToggleComments} />
      {toggleComments && <Comments post={post} uid={uid} name={name} />}
    </div>
  );
};
