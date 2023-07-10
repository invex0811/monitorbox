import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";

export const register = (email, password) => {
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then(() => {
      setDoc(doc(getFirestore(), "users", getAuth().currentUser.uid), {
        name: "",
        role: "user",
        photoURL: "",
      }).then((e) => console.log(e));
    })
    .catch((e) => {
      console.log(e);
    });
};
