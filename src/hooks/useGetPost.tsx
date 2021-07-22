import { useState, useEffect } from "react";

import firebase from "firebase/app";

import { PostProps } from "../pages/posts/Post";
import { storage_post_update } from "../functions/_local_last_post";

export const useGetPost = (postId?: string) => {
  const [post, setPost] = useState<PostProps>();

  useEffect(() => {
    if (!postId) {
      firebase
        .firestore()
        .collection("posts")
        .orderBy("createdAt", "desc")
        .limit(1)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            storage_post_update(doc.id);

            setPost({
              ...(doc.data() as PostProps),
              postId: doc.id,
              createdAt: doc.get("createdAt").toDate(),
            });
          });
        });
    } else {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .get()
        .then((doc) => {
          storage_post_update(doc.id);

          setPost({
            postId: doc.id,
            author: doc.get("author"),
            content: doc.get("content"),
            shiters: doc.get("shiters"),
            createdAt: doc.get("createdAt").toDate(),
            comments: doc.get("comments"),
          });
        });
    }
  }, []);

  return post;
};
