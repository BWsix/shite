import firebase from "firebase/app";
import { db } from "../App";

export const updateShite = (
  uid: string,
  postId: string,
  action: "shite" | "unshite"
) => {
  let docRef = db.collection("posts").doc(postId);
  docRef.get().then((doc) => {
    if (action === "shite") {
      docRef.update({
        shiters: firebase.firestore.FieldValue.arrayUnion(uid),
      });
    } else {
      docRef.update({
        shiters: firebase.firestore.FieldValue.arrayRemove(uid),
      });
    }
  });
};
