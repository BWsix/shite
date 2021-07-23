import React, { useState, useContext } from "react";

import { PostContext } from "./PostContent";
import { UserContext } from "../../App";

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
  _post: PostProps;
}

export const Post: React.FC<Props> = ({ _post }) => {
  const user = useContext(UserContext);

  const [toggleComments, setToggleComments] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [editedContent, setEditedContent] = useState(
    _post.content.replaceAll("n_n_", "\n")
  );

  const [post, setPost] = useState(_post);
  return (
    <PostContext.Provider value={{ post, setPost }}>
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

            {user.uid === post.author && (
              <Options
                toggleEdit={toggleEdit}
                setToggleEdit={setToggleEdit}
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
            <Content />
          )}
        </div>

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
