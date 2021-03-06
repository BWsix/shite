import { useState, useEffect } from "react";

import firebase from "firebase/app";
import { db } from "../../../App";

import { PostProps } from "../types";

export const useGetPrevPosts = (
  user: firebase.User | null | undefined,
  limit?: number
) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [toggle, setToggle] = useState(() => true);
  const [end, setEnd] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user || !toggle) return;
    setToggle(false);

    db.collection("posts")
      .orderBy("createdAt", "desc")
      .startAfter(posts.length ? posts[posts.length - 1].createdAt : "")
      .limit(limit || 5)
      .get()
      .then((snap) => {
        if (snap.empty) setEnd(true);

        setPosts((prev) => [
          ...prev,
          ...snap.docs.map((doc) => {
            return {
              ...(doc.data() as PostProps),
              postId: doc.id,
              createdAt: doc.get("createdAt").toDate(),
            };
          }),
        ]);
      })
      .catch((err) => {
        setError(true);
      });
  }, [user, toggle]);
  return { posts, setPosts, setToggle, end, error };
};

export interface useGetPrevPostsProps {
  POSTS: {
    posts: PostProps[];
    setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    end: boolean;
    error: boolean;
  };
}
