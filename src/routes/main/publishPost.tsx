import { v4 } from "uuid";

import firebase from "firebase/app";
import { encodeContent } from "../../functions/hub";
import { db } from "../../App";

export const publishPost = (
  uid: string,
  content: string = "",
  image: string = ""
) => {
  db.collection("posts")
    .add({
      content: encodeContent(content),
      author: uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      image: image,
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
