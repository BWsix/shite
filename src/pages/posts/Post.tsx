import React, { useState } from "react";

import { Content, Stats, Options, PostEditor } from "./hub";
import { Comments } from "./comments/Comments";
import { UserIcon } from "../../components/UserIcon";

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
    <div
      // className="Post-outer"
      style={{
        backgroundColor: "#242526",
        width: "100%",
        margin: "calc(1vh + 15px) 0",
        borderRadius: "10px",
      }}
    >
      <div style={{ padding: "10px" }}>
        <div className="Post-content-upper">
          <UserIcon type="large" uid={post.author} withName={true} />

          {uid === post.author && (
            <Options
              toggleEdit={toggleEdit}
              setToggleEdit={setToggleEdit}
              post={post}
              editedContent={editedContent}
              uid={uid}
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

      {toggleComments && (
        <>
          <div className="Post-strike" />
          <Comments post={post} uid={uid} name={name} />
        </>
      )}
    </div>
  );
};
