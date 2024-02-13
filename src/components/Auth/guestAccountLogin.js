import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

export const guestLogin = () => {
  signInAnonymously(getAuth()).then(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        return console.log(user.uid);
      } else {
      }
    });
  });
};
