import { useState, useEffect } from "react";

import { db } from "../App";

import { CommentProps } from "../pages/posts/comments/Comment";

export const useGetComment = (commentId?: string) => {
  const [comment, setComment] = useState<CommentProps>();

  useEffect(() => {
    db.collection("comments")
      .doc(commentId)
      .get()
      .then((doc) => {
        setComment({
          ...(doc.data() as CommentProps),
          commentId: doc.id,
          createdAt: doc.get("createdAt").toDate(),
        });
      });
  }, []);

  return comment;
};
