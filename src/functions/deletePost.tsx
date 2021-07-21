import firebase from "firebase/app";

export const deletePost = (postId: string) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .get()
    .then((doc) => {
      doc.get("comments").forEach((elem: string | undefined) => {
        firebase.firestore().collection("comments").doc(elem).delete();
      });

      firebase.firestore().collection("posts").doc(postId).delete();
    });

  firebase.firestore().collection("activities").doc("posts").update({
    postId,
    type: "delete",
  });
};
