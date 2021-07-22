import React from "react";

import { useComments } from "../../../hooks/useComments";

import { Comment } from "./Comment";
import { AddComment } from "./AddComment";
import { PostProps } from "../Post";
import { Status } from "../../../components/hub";

import "./Comments.css";
import "../Post.css";
import "../../../styles/button.css";

interface CommentsProps {
  post: PostProps;
  uid: string;
  name: string;
}

export const Comments: React.FC<CommentsProps> = ({ post, uid, name }) => {
  const { comments, setToggle, end, error } = useComments(post.postId);

  if (error) return <Status content="error" />;

  return (
    <div className="Post">
      {comments && (
        <>
          {!end && (
            <p
              className="btn-thin btn-sharp Comment-view-prev"
              onClick={() => setToggle(true)}
            >
              view previous comments
            </p>
          )}
          {comments.map((cmt) => {
            return <Comment cmt={cmt} key={cmt.commentId} />;
          })}
        </>
      )}

      <AddComment uid={uid} postId={post.postId} name={name} />
    </div>
  );
};
