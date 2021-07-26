import firebase from "firebase/app";
import { db } from "../../../App";
import { encodeContent } from "../../../functions/hub";

export const publishComment = (
  content: string,
  uid: string,
  postId: string
) => {
  db.collection("comments")
    .add({
      postId,
      content: encodeContent(content),
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
