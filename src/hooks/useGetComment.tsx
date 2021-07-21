import { useState, useEffect } from "react";

import firebase from "firebase/app";

import { CommentProps } from "../pages/posts/comments/Comment";

export const useGetComment = (commentId?: string) => {
  const [comment, setComment] = useState<CommentProps>();

  useEffect(() => {
    firebase
      .firestore()
      .collection("comments")
      .doc(commentId)
      .get()
      .then((doc) => {
        setComment({
          commentId: doc.id,
          author: doc.get("author"),
          postId: doc.get("postId"),
          content: doc.get("content"),
          shiters: doc.get("shiters"),
          createdAt: doc.get("createdAt").toDate(),
        });
      });
  }, []);

  return comment;
};
