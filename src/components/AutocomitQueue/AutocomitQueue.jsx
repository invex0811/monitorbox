import MainLayout from "../../Layout/MainLayout";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemSecondaryAction,
  TextField,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { doc, onSnapshot, getFirestore, setDoc } from "firebase/firestore";
import { v4 as uuid4 } from "uuid";
import { closeAlert, showAlert } from "../../store/slicer/alertSlicer";
import { useDispatch } from "react-redux";
import useSound from "use-sound";

const AutocomitQueue = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [playOn] = useSound(
    "https://zvukogram.com/mp3/cats/2733/poyavlenie-podskazki-na-ekrane.mp3",
    {
      volume: 0.5,
    }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQueue = async () => {
      const db = getFirestore();
      const usersRef = doc(db, "autocommitQueue", "users");

      const unsubscribe = onSnapshot(usersRef, (doc) => {
        if (doc.exists()) {
          setUsers(doc.data().queue || []);
        }
      });

      return () => unsubscribe();
    };

    fetchQueue();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      if (users[0].id === localStorage.getItem("id")) {
        playOn();
      }
    }
  }, [users]);

  const setFirebase = async (arr) => {
    const refDb = doc(getFirestore(), "autocommitQueue", "users");

    await setDoc(refDb, {
      queue: arr,
    });
  };

  const addUser = () => {
    const id = uuid4();
    if (name.length > 0) {
      if (localStorage.getItem("id") === null) {
        if (!users) {
          localStorage.setItem("id", id);
          setFirebase([{ name: name, id: id }])
            .then(() => {
              dispatch(
                showAlert({
                  severity: "success",
                  title: "Success",
                  value: "You added",
                  show: true,
                })
              );
              setTimeout(() => {
                dispatch(closeAlert());
              }, 3000);
            })
            .catch((e) => {
              dispatch(
                showAlert({
                  severity: "error",
                  title: e.code,
                  value: e.message,
                  show: true,
                })
              );
              setTimeout(() => {
                dispatch(closeAlert());
              }, 3000);
            });
        } else {
          localStorage.setItem("id", id);

          setFirebase([...users, { name: name, id: id }])
            .then(() => {
              dispatch(
                showAlert({
                  severity: "success",
                  title: "Success",
                  value: "You added",
                  show: true,
                })
              );
              setTimeout(() => {
                dispatch(closeAlert());
              }, 3000);
            })
            .catch((e) => {
              dispatch(
                showAlert({
                  severity: "error",
                  title: e.code,
                  value: e.message,
                  show: true,
                })
              );
              setTimeout(() => {
                dispatch(closeAlert());
              }, 3000);
            });
        }
      }
    }
  };

  const skip = () => {
    const indexUser = users.findIndex(
      (item) => item.id === localStorage.getItem("id")
    );

    const deleteUser = users.splice(indexUser, indexUser);
    const updatedArr = [...users, deleteUser[0]];
    setFirebase(updatedArr)
      .then(() => {
        dispatch(
          showAlert({
            severity: "success",
            title: "Success",
            value: "You skipped it",
            show: true,
          })
        );
        setTimeout(() => {
          dispatch(closeAlert());
        }, 3000);
      })
      .catch((e) => {
        dispatch(
          showAlert({
            severity: "error",
            title: e.code,
            value: e.message,
            show: true,
          })
        );
        setTimeout(() => {
          dispatch(closeAlert());
        }, 3000);
      });
  };
  const next = () => {
    const indexUser = users.findIndex(
      (item) => item.id === localStorage.getItem("id")
    );
    if (indexUser === 0) {
      const newArr = users.shift();
      const updatedArr = [...users, newArr];
      console.log(newArr, updatedArr);
      setFirebase(updatedArr)
        .then(() => {
          dispatch(
            showAlert({
              severity: "success",
              title: "Success",
              value: "",
              show: true,
            })
          );
          setTimeout(() => {
            dispatch(closeAlert());
          }, 3000);
        })
        .catch((e) => {
          dispatch(
            showAlert({
              severity: "error",
              title: e.code,
              value: e.message,
              show: true,
            })
          );
          setTimeout(() => {
            dispatch(closeAlert());
          }, 3000);
        });
    } else {
      dispatch(
        showAlert({
          severity: "warning",
          title: "You are not the first in queue",
          value: "If you want to skip, click button SKIP",
          show: true,
        })
      );
      setTimeout(() => {
        dispatch(closeAlert());
      }, 3000);
    }
  };
  const exit = () => {
    const resultConfirm = window.confirm("Confirm exit?");
    if (resultConfirm) {
      const updateArr = users.filter(
        (obj) => obj.id !== localStorage.getItem("id")
      );
      setFirebase(updateArr)
        .then(() => {
          dispatch(
            showAlert({
              severity: "success",
              title: "Success",
              value: "You out of queue",
              show: true,
            })
          );
          setTimeout(() => {
            dispatch(closeAlert());
          }, 3000);
        })
        .catch((e) => {
          dispatch(
            showAlert({
              severity: "error",
              title: e.code,
              value: e.message,
              show: true,
            })
          );
          setTimeout(() => {
            dispatch(closeAlert());
          }, 3000);
        });
      localStorage.removeItem("id");
    }
  };

  const viewBtn = () => {
    const indexUser = users.findIndex(
      (item) => item.id === localStorage.getItem("id")
    );
    if (indexUser === 0) {
      return (
        <Button onClick={next} variant={"contained"} color={"success"}>
          Next
        </Button>
      );
    } else {
      return (
        <Button onClick={skip} variant={"contained"} color={"warning"}>
          Skip
        </Button>
      );
    }
  };

  const userList = users
    ? users.map((item) => (
        <ListItem
          key={item.id}
          sx={{
            border:
              item.id === localStorage.getItem("id") ? "2px solid #3e3dbb" : "",
            borderRadius: "5px",
          }}
        >
          <ListItemText>
            <Typography variant={"h5"}>{item.name}</Typography>
          </ListItemText>
          <ListItemSecondaryAction
            sx={{
              display: item.id === localStorage.getItem("id") ? "" : "none",
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
            display: localStorage.getItem("id") !== null ? "none" : "flex",
            alignItems: "center",
          }}
        >
          <TextField
            type={"text"}
            id="outlined-number"
            label={"Name"}
            onChange={(event) => {
              setName(event.target.value);
            }}
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
