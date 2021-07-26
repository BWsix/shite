import { db } from "../../../App";
import { encodeContent } from "../../../functions/encodeContent";

export const updateBio = (uid: string, bio: string) => {
  db.collection("users")
    .doc(uid)
    .update({
      bio: encodeContent(bio),
    });
};
