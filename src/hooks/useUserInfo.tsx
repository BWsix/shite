import { useState, useEffect } from "react";

import firebase from "firebase/app";

import {
  storage_userinfo_get,
  storage_userinfo_update,
} from "../functions/_local_userinfo";

export const useUserInfo = (uid: string): [name: string, avatar: string] => {
  const [name, setName] = useState("loading...");
  const [avatar, setAvatar] = useState("https://i.imgur.com/F1n20rR.png");

  useEffect(() => {
    let userInfo = storage_userinfo_get(uid);

    if (userInfo) {
      setName((prev) => userInfo!.name);
      setAvatar((prev) => userInfo!.avatar);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snap) => {
          setName(snap.get("name"));
          setAvatar(snap.get("avatar"));
          storage_userinfo_update(uid, snap.get("name"), snap.get("avatar"));
        });
    }
  }, []);

  return [name, avatar];
};
