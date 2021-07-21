import firebase from "firebase/app";
import { useEffect } from "react";

import { PostProps } from "../pages/posts/Post";

export const useListener = (
  posts: PostProps[],
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>
) => {
  useEffect(() => {
    return firebase
      .firestore()
      .collection("activities")
      .onSnapshot((snap) => {
        snap.docs.forEach((doc) => {
          let actionType = doc.get("type");
          let postId = doc.get("postId");

          if (actionType === "add") {
            firebase
              .firestore()
              .collection("posts")
              .doc(postId)
              .get()
              .then((new_doc) => {
                setPosts((prev) => {
                  if (!prev.length) return prev;
                  if (prev[0].postId === new_doc.id) return prev;

                  return [
                    {
                      postId: new_doc.id,
                      author: new_doc.get("author"),
                      content: new_doc.get("content"),
                      shiters: new_doc.get("shiters"),
                      createdAt: new_doc.get("createdAt").toDate(),
                      comments: new_doc.get("comments"),
                    },
                    ...prev,
                  ];
                });
              });
          } else if (actionType === "delete") {
            setPosts((prev) => {
              if (!prev.length) return prev;
              if (!prev.map((post) => post.postId).includes(postId))
                return prev;

              return prev.filter((post) => post.postId !== postId);
            });
          }
        });
      });
  }, []);
};
