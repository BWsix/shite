import { useState, useEffect } from "react";

import firebase from "firebase/app";

import { CommentProps, PostProps } from "../types";

export const useComments = (
  postId: string,
  setPost: React.Dispatch<React.SetStateAction<PostProps>>,
  limit?: number
) => {
  const [comments, setComments] = useState<
    { comment: CommentProps; is_new: boolean }[]
  >([]);
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
          return doc.get("comments");
        });

        setPost((post) => ({
          ...post,
          comments: doc.get("comments"),
          shiters: doc.get("shiters"),
        }));
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
            comment: {
              ...(doc.data() as CommentProps),
              commentId: doc.id,
              createdAt: doc.get("createdAt").toDate(),
            },
            is_new: false,
          },
          ...prev.map((tuple) => ({ comment: tuple.comment, is_new: false })),
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
        setComments((prev) => [
          ...prev.map((tuple) => ({ comment: tuple.comment, is_new: false })),
          {
            comment: {
              ...(doc.data() as CommentProps),
              commentId: doc.id,
              createdAt: doc.get("createdAt").toDate(),
            },
            is_new: true,
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
