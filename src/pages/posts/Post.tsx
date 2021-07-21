import React, { useState } from "react";

import { Content, Stats } from "./hub";
import { Comments } from "./comments/Comments";
import { UserIcon } from "../../components/UserIcon";
import { deletePost } from "../../functions/deletePost";

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

  return (
    <div className="Post-outer">
      <div className="Post">
        <div className="Post-content-upper">
          <UserIcon type="large" uid={post.author} withName={true} />
          {uid === post.author && (
            <button
              className="btn-thin btn-round"
              onClick={() => deletePost(post.postId)}
            >
              delete
            </button>
          )}
        </div>

        <Content post={post} />
      </div>

      <div className="Post-strike" />

      <Stats post={post} uid={uid} setToggleComments={setToggleComments} />
      {toggleComments && <Comments post={post} uid={uid} name={name} />}
    </div>
  );
};
