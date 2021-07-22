import React, { useState } from "react";

import { Content, Stats, Options, PostEditor } from "./hub";
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

          {uid === post.author && (
            <Options
              toggleEdit={toggleEdit}
              setToggleEdit={setToggleEdit}
              post={post}
              editedContent={editedContent}
            />
          )}
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
