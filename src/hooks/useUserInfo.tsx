import { useState, useEffect } from "react";

import { db } from "../App";

import {
  storage_userinfo_get,
  storage_userinfo_update,
} from "../functions/_local_userinfo";

export const useUserInfo = (uid: string, withCover: boolean = false) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("https://i.imgur.com/xicaprt.png");
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

    if (withCover) {
      db.collection("users")
        .doc(uid)
        .get()
        .then((snap) => {
          if (!snap.exists) return setError(true);

          setBio(snap.get("bio"));
          setCover(snap.get("cover") || "https://i.imgur.com/PZxq3zy.png");
        });
    }
  }, [uid]);

  return { name, avatar, bio, cover, error };
};
