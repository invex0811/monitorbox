import MainLayout from "../../Layout/MainLayout";
import {
  Typography,
  List,
  Button,
  TextField,
  Box,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  doc,
  getFirestore,
  setDoc,
  collection,
  onSnapshot,
  query,
  deleteDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import { guestLogin } from "../Auth/guestAccountLogin";
import {
  addUsers,
  setName,
  setUserUID,
} from "../../store/slicer/autocommitSlicer";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { DateTime } from "luxon";

const AutocomitQueue = () => {
  const [playOn] = useSound(
    "https://zvukogram.com/mp3/cats/2733/poyavlenie-podskazki-na-ekrane.mp3",
    {
      volume: 0.5,
    }
  );
  const dispatch = useDispatch();
  const queue = useSelector((state) => state.autocommit.queue);
  const name = useSelector((state) => state.autocommit.name);
  const userUID = useSelector((state) => state.autocommit.userUID);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        dispatch(setUserUID(getAuth().currentUser.uid));
      }
    });
  });

  useEffect(() => {
    const q = query(collection(getFirestore(), "autocommitQueue"));
    onSnapshot(q, (snapshot) => {
      const arr = [];
      snapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      dispatch(addUsers(arr));
    });
  }, []);
  console.log(queue);
  // useEffect(() => {
  //   if (queue.length > 0) {
  //     if (queue[0].id === userUID) {
  //       playOn();
  //     }
  //   }
  // }, [queue]);

  const addUserInFirebase = async (arr) => {
    await setDoc(
      doc(getFirestore(), "autocommitQueue", getAuth().currentUser.uid),
      arr
    );
  };

  const addUser = () => {
    if (name.length > 0) {
      guestLogin();
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          dispatch(setUserUID(getAuth().currentUser.uid));
          addUserInFirebase({
            name: name,
            id: getAuth().currentUser.uid,
            createdAt: DateTime.utc().toFormat("FF"),
          });
        }
      });
    }
  };
  // const skip = () => {
  //   const indexUser = users.findIndex(
  //     (item) => item.id === localStorage.getItem("id")
  //   );
  //
  //   const deleteUser = users.splice(indexUser, indexUser);
  //   const updatedArr = [...users, deleteUser[0]];
  //   setFirebase(updatedArr)
  //     .then(() => {
  //       dispatch(
  //         showAlert({
  //           severity: "success",
  //           title: "Success",
  //           value: "You skipped it",
  //           show: true,
  //         })
  //       );
  //       setTimeout(() => {
  //         dispatch(closeAlert());
  //       }, 3000);
  //     })
  //     .catch((e) => {
  //       dispatch(
  //         showAlert({
  //           severity: "error",
  //           title: e.code,
  //           value: e.message,
  //           show: true,
  //         })
  //       );
  //       setTimeout(() => {
  //         dispatch(closeAlert());
  //       }, 3000);
  //     });
  // };
  const next = async () => {
    const indexUser = queue.findIndex((item) => item.id === userUID);
    const user = queue[indexUser];

    await deleteDoc(doc(getFirestore(), "autocommitQueue", userUID));
    await setDoc(
      doc(getFirestore(), "autocommitQueue", getAuth().currentUser.uid),
      user
    );
  };
  const exit = () => {
    const resultConfirm = window.confirm("Confirm exit?");
    if (resultConfirm) {
      deleteDoc(doc(getFirestore(), "autocommitQueue", userUID)).then(() => {
        getAuth()
          .signOut()
          .then(() => {
            dispatch(setUserUID(""));
          });
      });
    }
  };

  const viewBtn = () => {
    const indexUser = queue.findIndex((item) => item.id === userUID);
    if (indexUser === 0) {
      return (
        <Button onClick={() => next()} variant={"contained"} color={"success"}>
          Next
        </Button>
      );
    } else {
      return (
        <Button variant={"contained"} color={"warning"}>
          Skip
        </Button>
      );
    }
  };
  const userList = queue
    ? queue.map((item) => (
        <ListItem
          key={item.id}
          sx={{
            border: item.id === userUID ? "2px solid #3e3dbb" : "",
            borderRadius: "5px",
          }}
        >
          <ListItemText>
            <Typography variant={"h5"}>{item.name}</Typography>
          </ListItemText>
          <ListItemSecondaryAction
            sx={{
              display: item.id === userUID ? "" : "none",
            }}
          >
            {viewBtn()}
            <Button
              onClick={exit}
              sx={{ marginLeft: "10px" }}
              variant={"contained"}
              color={"error"}
            >
              Exit
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      ))
    : "";
  return (
    <MainLayout>
      <Typography variant="h3" textAlign={"center"}>
        Queue
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List
          secondaryAction={<Button variant="outlined">Delete</Button>}
          sx={{
            width: "600px",
          }}
        >
          {userList}
        </List>
        <Box
          sx={{
            display: userUID ? "none" : "flex",
            alignItems: "center",
          }}
        >
          <TextField
            onChange={(event) => dispatch(setName(event.target.value))}
            type={"text"}
            id="outlined-number"
            label={"Name"}
          />
          <Button
            onClick={addUser}
            variant={"outlined"}
            sx={{ "&.MuiButton-root": { height: "56px" } }}
          >
            Push
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default AutocomitQueue;
