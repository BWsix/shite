import firebase from "firebase/app";
import "firebase/auth";

import { auth } from "../../App";

export const signIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithRedirect(provider);
};

export const signOut = async () => {
  await auth.signOut();
  window.location.reload();
};

export const signInAnonymously = () => {
  auth.signInAnonymously();
};

export const loginWithGoogle = async () => {
  await auth.signOut();
  await signIn();
  window.location.reload();
};
