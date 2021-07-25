import { useState, useEffect } from "react";

import firebase from "firebase/app";

import { PostProps } from "../../pages/posts/types";

export const useUser = (
  uid: string,
  posts: PostProps[],
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>,
  limit?: number
) => {
  const [postIds, setPostIds] = useState<string[]>([]);
  const [toFetchIds, setToFetchIds] = useState<string[]>([]);
  const [requestedIds, setRequestedIds] = useState<string[]>([]);

  const [toggle, setToggle] = useState(false);
  const [end, setEnd] = useState(true);
  const [error, setError] = useState(false);

  const append_post = (id: string) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .get()
      .then((doc) => {
        setPosts((prev) => [
          ...prev,
          {
            ...(doc.data() as PostProps),
            postId: doc.id,
            createdAt: doc.get("createdAt").toDate(),
          },
        ]);
      })
      .catch((err) => {
        setError(true);
      });
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (!doc.exists) return setError(true);

        setPostIds((prev) => {
          return doc.get("posts");
        });
      });
  }, [posts]);

  useEffect(() => {
    if (!postIds.length) return;
    setToFetchIds(postIds);

    if (!posts.length) {
      setToggle(true);
      setEnd(false);
    }
  }, [postIds]);

  useEffect(() => {
    if (!toggle) return;
    setToggle(false);

    let toRender = toFetchIds
      .filter((id) => !requestedIds.includes(id))
      .slice(-4)
      .reverse();

    setRequestedIds((prev) => [...prev, ...toRender]);
    toRender.forEach((id) => append_post(id));
  }, [toggle]);

  useEffect(() => {
    if (posts.map((post) => post.postId).length === toFetchIds.length)
      setEnd(true);
  }, [posts, toFetchIds]);

  return { setToggle, end, error };
};
