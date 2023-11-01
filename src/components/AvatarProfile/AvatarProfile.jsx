import { Avatar } from "@mui/material";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, getFirestore } from "firebase/firestore";

const AvatarProfile = () => {
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        const takeData = async () => {
          const db = getFirestore();
          const docRef = doc(db, "users", getAuth().currentUser.uid);

          const docSnap = await getDoc(docRef);
          setPhotoURL(docSnap.data().photoURL);
        };
        takeData();
      }
    });
  });

  return (
    <div>
      <Avatar src={photoURL} />
    </div>
  );
};

export default AvatarProfile;
