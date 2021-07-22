import { v4 } from "uuid";

import firebase from "firebase/app";
import { db } from "../App";

export const updatePost = (content: string, postId: string) => {
  db.collection("posts")
    .doc(postId)
    .update({
      content: content.replace(/[\r\n]/g, "n_n_"),
    })
    .then(() => {
      firebase.firestore().collection("activities").doc("posts").update({
        type: "edit",
        postId: postId,
        uuid: v4(),
      });
    });
};
