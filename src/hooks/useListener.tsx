import { useEffect, useState } from "react";

import firebase from "firebase/app";

import { PostProps } from "../pages/posts/Post";

interface ActionProps {
  type: "add" | "edit" | "delete";
  postId: string;
  time: Date;
}

export const useListener = (
  posts: PostProps[],
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>
) => {
  const [action, setAction] = useState<ActionProps>();

  useEffect(() => {
    return firebase
      .firestore()
      .collection("activities")
      .doc("posts")
      .onSnapshot((doc) => {
        setAction(doc.data() as ActionProps);
      });
  }, []);

  useEffect(() => {
    if (!action || action.time || !posts) return;

    if (action.type === "add") {
      if (posts[0].postId === action.postId) return;

      firebase
        .firestore()
        .collection("posts")
        .doc(action.postId)
        .get()
        .then((new_doc) => {
          setPosts((prev) => {
            return [
              {
                ...(new_doc.data() as PostProps),
                postId: new_doc.id,
                createdAt: new_doc.get("createdAt").toDate(),
              },
              ...prev,
            ];
          });
        });
    } else if (action.type === "delete") {
      setPosts(posts.filter((post) => post.postId !== action.postId));
    } else if (action.type === "edit") {
      if (!posts.map((post) => post.postId).includes(action.postId)) return;

      firebase
        .firestore()
        .collection("posts")
        .doc(action.postId)
        .get()
        .then((doc) => {
          setPosts((prev) => {
            return prev.map((post) => {
              if (post.postId !== action.postId) return post;

              return {
                ...post,
                content: doc.get("content"),
              };
            });
          });
        });
    }
  }, [action, posts]);
};
