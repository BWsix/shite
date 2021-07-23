import firebase from "firebase/app";
import { db } from "../../../App";

export const publishComment = (
  content: string,
  uid: string,
  postId: string
) => {
  db.collection("comments")
    .add({
      postId,
      content: content.trim().replace(/[\r\n]/g, "n_n_"),
      author: uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      shiters: [],
    })
    .then((createdDoc) => {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion(createdDoc.id),
        });
    });
};
