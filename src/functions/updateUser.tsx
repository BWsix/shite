import firebase from "firebase/app";

import { storage_userinfo_update } from "./_local_userinfo";

export const updateUser = (user: firebase.User) => {
  storage_userinfo_update(user.uid, user.displayName!, user.photoURL!);

  let docRef = firebase.firestore().collection("users").doc(user.uid);
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
        following: [user.uid],
        // posts: [],
        // following_posts: [],
      });
    }
  });
};
