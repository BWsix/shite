import firebase from "firebase/app";

export const publishPost = (content: string, uid: string) => {
  firebase
    .firestore()
    .collection("posts")
    .add({
      content: content.replace(/[\r\n]/g, "n_n_"),
      author: uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      shiters: [],
      comments: [],
    })
    .then((createdDoc) => {
      firebase.firestore().collection("activities").doc("posts").update({
        type: "add",
        postId: createdDoc.id,
      });
    });
};
