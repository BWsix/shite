import { v4 } from "uuid";

import firebase from "firebase/app";
import { db } from "../../../App";

export const deletePost = (postId: string, uid: string) => {
  db.collection("posts")
    .doc(postId)
    .get()
    .then((doc) => {
      doc.get("comments").forEach((elem: string | undefined) => {
        db.collection("comments").doc(elem).delete();
      });

      db.collection("posts").doc(postId).delete();
      db.collection("users")
        .doc(uid)
        .update({
          posts: firebase.firestore.FieldValue.arrayRemove(postId),
        });
    });

  db.collection("activities").doc("posts").update({
    postId,
    type: "delete",
    uuid: v4(),
  });
};
