import firebase from "firebase/app";

export const publishComment = (
  content: string,
  uid: string,
  postId: string
) => {
  firebase
    .firestore()
    .collection("comments")
    .add({
      postId,
      content: content.replace(/[\r\n]/g, "n_n_"),
      author: uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      shiters: [],
    })
    .then((createdDoc) => {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion(createdDoc.id),
        });
    });
};
