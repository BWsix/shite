import { useEffect, useState } from "react";

import firebase from "firebase/app";

import { PostProps } from "../pages/posts/Post";

export const useListener = (
  posts: PostProps[],
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>
) => {
  useEffect(() => {
    if (!posts.length) return;

    return firebase
      .firestore()
      .collection("activities")
      .onSnapshot((snap) => {
        snap.docs.forEach((doc) => {
          let actionType = doc.get("type");
          let postId = doc.get("postId");

          if (actionType === "add") {
            if (posts[0].postId === postId) return;

            firebase
              .firestore()
              .collection("posts")
              .doc(postId)
              .get()
              .then((new_doc) => {
                setPosts((prev) => [
                  {
                    ...(new_doc.data() as PostProps),
                    postId: new_doc.id,
                    createdAt: new_doc.get("createdAt").toDate(),
                  },
                  ...prev,
                ]);
              });
          } else if (actionType === "delete") {
            setPosts((prev) => prev.filter((post) => post.postId !== postId));
          }
        });
      });
  }, [posts]);
};
