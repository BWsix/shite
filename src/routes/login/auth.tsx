import firebase from "firebase";

import { auth } from "../../App";

export const signIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
};

export const signOut = async () => {
  await auth.signOut();
  window.location.reload();
};
