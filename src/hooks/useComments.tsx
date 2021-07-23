import { useState, useEffect } from "react";

import firebase from "firebase/app";

import { PostProps } from "../pages/posts/Post";
import { CommentProps } from "../pages/posts/comments/Comment";

export const useComments = (
  postId: string,
  setPost: React.Dispatch<React.SetStateAction<PostProps>>,
  limit?: number
) => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [commentIds, setCommentIds] = useState<string[]>([]);

  const [fetchedIds, setFetchedIds] = useState<string[]>([]);
  const [initialIds, setInitialIds] = useState<string[]>([]);

  const [toggle, setToggle] = useState(false);
  const [end, setEnd] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    return firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .onSnapshot((doc) => {
        setCommentIds((prev) => {
          setPost((post) => ({
            ...post,
            comments: doc.get("comments"),
            shiters: doc.get("shiters"),
          }));
          return doc.get("comments");
        });
      });
  }, []);

  const prepend_comment = (id: string) => {
    setFetchedIds((prev) => [...prev, id]);

    firebase
      .firestore()
      .collection("comments")
      .doc(id)
      .get()
      .then((doc) => {
        setComments((prev) => [
          {
            ...(doc.data() as CommentProps),
            commentId: doc.id,
            createdAt: doc.get("createdAt").toDate(),
          },
          ...prev,
        ]);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const append_comment = (id: string) => {
    setFetchedIds((prev) => [id, ...prev]);

    firebase
      .firestore()
      .collection("comments")
      .doc(id)
      .get()
      .then((doc) => {
        window.scrollBy(0, doc.get("content").split("n_n_").length * 21 + 33);

        setComments((prev) => [
          ...prev,
          {
            ...(doc.data() as CommentProps),
            commentId: doc.id,
            createdAt: doc.get("createdAt").toDate(),
          },
        ]);
      })
      .catch((err) => {
        setError(true);
      });
  };

  useEffect(() => {
    if (!commentIds.length) return;

    if (!initialIds.length) {
      setInitialIds(commentIds);
      setEnd(false);
      setToggle(true);
    } else {
      commentIds
        .filter((id) => !initialIds.includes(id))
        .filter((id) => !fetchedIds.includes(id))
        .forEach((id) => {
          append_comment(id);
        });
    }
  }, [commentIds]);

  useEffect(() => {
    if (!toggle) return;
    setToggle(false);

    let toRender = initialIds
      .filter((id) => !fetchedIds.includes(id))
      .slice(-4)
      .reverse();

    toRender.forEach((id) => prepend_comment(id));
  }, [toggle]);

  useEffect(() => {
    if (commentIds.length === fetchedIds.length) setEnd(true);
  }, [commentIds, fetchedIds]);

  return { comments, setToggle, end, error };
};
