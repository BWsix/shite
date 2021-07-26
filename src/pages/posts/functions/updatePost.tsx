import { v4 } from "uuid";

import firebase from "firebase/app";
import { db } from "../../../App";
import { encodeContent } from "../../../functions/hub";

export const updatePost = (content: string, postId: string) => {
  db.collection("posts")
    .doc(postId)
    .update({
      content: encodeContent(content),
    })
    .then(() => {
      firebase.firestore().collection("activities").doc("posts").update({
        type: "edit",
        postId: postId,
        uuid: v4(),
      });
    });
};
