import { useEffect } from "react";

import firebase from "firebase/app";

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
            if (!posts.map((post) => post.postId).includes(postId)) return;

            setPosts((prev) => prev.filter((post) => post.postId !== postId));
          } else if (actionType === "edit") {
            if (!posts.map((post) => post.postId).includes(postId)) return;

            firebase
              .firestore()
              .collection("posts")
              .doc(postId)
              .get()
              .then((editedPost) => {
                if (
                  posts.find(
                    (post) => post.content === editedPost.get("content")
                  )
                )
                  return;

                setPosts((prev) =>
                  prev.map((post) => {
                    if (post.postId !== postId) return post;
                    return {
                      ...post,
                      content: editedPost.get("content"),
                    };
                  })
                );
              });
          }
        });
      });
  }, [posts]);
};
