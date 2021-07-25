import { useState, useEffect } from "react";

import { db } from "../App";

import {
  storage_userinfo_get,
  storage_userinfo_update,
} from "../functions/_local_userinfo";

export const useUserInfo = (
  uid: string,
  withCover: boolean = false
): {
  name: string;
  avatar: string;
  bio: string;
  cover: string;
  error: boolean;
} => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("https://i.imgur.com/F1n20rR.png");
  const [bio, setBio] = useState("");
  const [cover, setCover] = useState("https://i.imgur.com/PZxq3zy.png");

  const [error, setError] = useState(false);

  useEffect(() => {
    let userInfo = storage_userinfo_get(uid);

    if (userInfo) {
      setName((prev) => userInfo!.name);
      setAvatar((prev) => userInfo!.avatar);
    } else {
      db.collection("users")
        .doc(uid)
        .get()
        .then((snap) => {
          if (!snap.exists) return setError(true);

          setName(snap.get("name"));
          setAvatar(snap.get("avatar"));
          storage_userinfo_update(uid, snap.get("name"), snap.get("avatar"));
        });
    }
  }, []);

  if (withCover) {
    db.collection("users")
      .doc(uid)
      .get()
      .then((snap) => {
        if (!snap.exists) return setError(true);

        setBio(snap.get("bio"));
        if (snap.get("cover").length) setCover(snap.get("cover"));
      });
  }

  return { name, avatar, bio, cover, error };
};
