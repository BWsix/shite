import firebase from "firebase/app";
import { db } from "../App";

import { storage_userinfo_update } from "./_local_userinfo";

export const updateUser = (user: firebase.User) => {
  if (user.isAnonymous) return;

  storage_userinfo_update(user.uid, user.displayName!, user.photoURL!);

  let docRef = db.collection("users").doc(user.uid);
  docRef.get().then((doc) => {
    if (doc.exists) {
      docRef.update({
        name: user.displayName,
        avatar: user.photoURL,
      });
    } else {
      docRef.set({
        name: user.displayName,
        avatar: user.photoURL,
        bio: "",
        cover: "",
        following: [user.uid],
        posts: [],
      });
    }
  });
};
