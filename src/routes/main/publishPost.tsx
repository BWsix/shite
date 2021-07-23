import { v4 } from "uuid";

import firebase from "firebase/app";
import { db } from "../../App";

export const publishPost = (content: string, uid: string) => {
  db.collection("posts")
    .add({
      content: content.replace(/[\r\n]/g, "n_n_"),
      author: uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      image: "",
      shiters: [],
      comments: [],
    })
    .then((createdDoc) => {
      db.collection("activities").doc("posts").update({
        type: "add",
        postId: createdDoc.id,
        uuid: v4(),
      });
      db.collection("users")
        .doc(uid)
        .update({
          posts: firebase.firestore.FieldValue.arrayUnion(createdDoc.id),
        });
    });
};
