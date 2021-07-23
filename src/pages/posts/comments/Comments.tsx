import React, { useContext } from "react";

import { Comment } from "./Comment";
import { AddComment } from "./AddComment";
import { useComments } from "../hooks/hub";
import { PostContext } from "../PostContext";
import { Status } from "../../../components/hub";

import "./Comments.css";
import "../Post.css";
import "../../../styles/button.css";

export const Comments: React.FC = () => {
  const { post, setPost } = useContext(PostContext);
  const { comments, setToggle, end, error } = useComments(post.postId, setPost);

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

      <AddComment postId={post.postId} />
    </div>
  );
};
