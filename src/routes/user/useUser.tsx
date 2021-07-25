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
        setPostIds((prev) => {
          return doc.get("posts");
        });
      });

    if (posts.map((post) => post.postId).length === toFetchIds.length)
      setEnd(true);
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
      .filter((id) => !posts.map((post) => post.postId).includes(id))
      .slice(-4)
      .reverse();

    toRender.forEach((id) => append_post(id));
  }, [toggle]);

  return { setToggle, end, error };
};
