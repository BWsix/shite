import { useState, useEffect } from "react";

import { db } from "../App";

import { PostProps } from "../pages/posts/Post";

export const useGetPost = (postId?: string) => {
  const [post, setPost] = useState<PostProps>();

  useEffect(() => {
    if (!postId) {
      db.collection("posts")
        .orderBy("createdAt", "desc")
        .limit(1)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            setPost({
              ...(doc.data() as PostProps),
              postId: doc.id,
              createdAt: doc.get("createdAt").toDate(),
            });
          });
        });
    } else {
      db.collection("posts")
        .doc(postId)
        .get()
        .then((doc) => {
          setPost({
            ...(doc.data() as PostProps),
            postId: doc.id,
            createdAt: doc.get("createdAt").toDate(),
          });
        });
    }
  }, []);

  return post;
};
