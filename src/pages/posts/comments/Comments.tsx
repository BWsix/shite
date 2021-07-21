import React from "react";

import { useComments } from "../../../hooks/useComments";

import { Comment } from "./Comment";
import { AddComment } from "./AddComment";
import { PostProps } from "../Post";
import { Status } from "../../../components/hub";

import "../Post.css";
interface CommentsProps {
  post: PostProps;
  uid: string;
  name: string;
}

export const Comments: React.FC<CommentsProps> = ({ post, uid, name }) => {
  const { comments, error } = useComments(post.postId);

  if (error) return <Status content="error" />;

  return (
    <div className="Post">
      <AddComment uid={uid} postId={post.postId} name={name} />

      {comments &&
        comments.map((cmt) => {
          return <Comment cmt={cmt} key={cmt.commentId} />;
        })}
    </div>
  );
};
