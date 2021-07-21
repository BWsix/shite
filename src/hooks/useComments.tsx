import { useState, useEffect } from "react";

import firebase from "firebase/app";

import { CommentProps } from "../pages/posts/comments/Comment";

export const useComments = (postId: string, limit?: number) => {
  const [commentIds, setCommentIds] = useState<string[]>([]);
  const [fetched, setFetched] = useState<string[]>([]);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [error, setError] = useState(false);

  // const [toggle, setToggle] = useState(() => true);
  // const [end, setEnd] = useState(false);

  useEffect(() => {
    return firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .onSnapshot((doc) => {
        setCommentIds(doc.get("comments"));
      });
  }, []);

  useEffect(() => {
    const get_comment = (id: string) => {
      setFetched((prev) => [...prev, id]);

      firebase
        .firestore()
        .collection("comments")
        .doc(id)
        .get()
        .then((doc) => {
          setComments((prev) => [
            {
              commentId: doc.id,
              author: doc.get("author"),
              content: doc.get("content"),
              createdAt: doc.get("createdAt").toDate(),
              postId: doc.get("postId"),
              shiters: doc.get("shiters"),
            },
            ...prev,
          ]);
        })
        .catch((err) => {
          setError(true);
        });
    };

    if (commentIds) {
      commentIds.forEach((id) => {
        if (fetched.includes(id)) return;
        get_comment(id);
      });
    }
  }, [commentIds]);

  return { comments, error };
};
