import {
  Box,
  Button,
  Fade,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { closeAlert, showAlert } from "../../../store/slicer/alertSlicer";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rate, setRate] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState("");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [readOnly, setReadOnly] = useState(true);

  const dispatch = useDispatch();
  const theme = useTheme();

  const toggleShow = () => {
    setShow((s) => !s);
  };
  const openModal = () => {
    setShowModal((m) => !m);
  };

  const forward = useNavigate();

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user && !user.isAnonymous) {
        const takeData = async () => {
          const db = getFirestore();
          const docRef = doc(db, "users", getAuth().currentUser.uid);

          const docSnap = await getDoc(docRef);

          setName(docSnap.data().name);
          setEmail(getAuth().currentUser.email);
          setRate(docSnap.data().rate);
          setRole(docSnap.data().role);
          setPhoto(docSnap.data().photoURL);
        };
        takeData();
      } else if (!user) {
        forward("/");
      }
    });
  });

  const changePhoto = async () => {
    openModal();
    const photoRef = doc(getFirestore(), "users", getAuth().currentUser.uid);
    await updateDoc(photoRef, {
      photoURL: photo,
    });
  };

  const logout = () => {
    try {
      getAuth().signOut();
      dispatch(
        showAlert({
          severity: "success",
          title: "Success",
          value: "You logout!",
          show: true,
        })
      );
      setTimeout(() => {
        dispatch(closeAlert());
      }, 3000);
    } catch (e) {
      dispatch(
        showAlert({
          severity: "error",
          title: "Error",
          value: e,
          show: true,
        })
      );
      setTimeout(() => {
        dispatch(closeAlert());
      }, 3000);
    }
  };

  const editProfile = () => {
    setReadOnly(false);
  };

  const saveProfile = () => {
    setReadOnly(true);
    setDoc(doc(getFirestore(), "users", getAuth().currentUser.uid), {
      name: name,
      rate: rate,
      role: role,
      photoURL: photo,
    }).then((e) => console.log(e));
    dispatch(
      showAlert({
        severity: "success",
        title: "Success",
        value: "Data saved!",
        show: true,
      })
    );
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box sx={{ padding: "20px", textAlign: "center", position: "relative" }}>
        <Box
          onMouseEnter={toggleShow}
          onMouseLeave={toggleShow}
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            alignItems: "center",
          }}
        >
          <img
            src={photo}
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "20px",
            }}
            alt={""}
          />
          <Fade
            in={show}
            sx={{
              position: "absolute",
              cursor: "pointer",
              width: "200px",
              height: "40px",
              backgroundColor: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "20px",
            }}
            onClick={openModal}
          >
            <Typography
              textTransform={"uppercase"}
              variant="subtitle2"
              color={"#fff"}
            >
              Change photo
            </Typography>
          </Fade>
        </Box>
        <Modal
          open={showModal}
          onClose={openModal}
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
          }}
        >
          <Fade in={showModal}>
            <Box
              id="modal-modal-description"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
              }}
            >
              <TextField
                sx={{ my: "10px" }}
                variant={"outlined"}
                label={"Photo URL"}
                value={photo}
                onChange={(event) => setPhoto(event.target.value)}
              />
              <Button onClick={changePhoto}>Change</Button>
            </Box>
          </Fade>
        </Modal>
        <Box>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant={"subtitle2"}>Name:</Typography>
                </TableCell>
                <TableCell>
                  <input
                    type={"text"}
                    value={name}
                    readOnly={readOnly}
                    style={{
                      border: readOnly ? "none" : "2px solid #fff",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      background: "none",
                      color: theme.palette.text.primary,
                    }}
                    onChange={(event) => setName(event.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant={"subtitle2"}>Email:</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant={"subtitle1"}>{email}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant={"subtitle2"}>Rate:</Typography>
                </TableCell>
                <TableCell>
                  <input
                    type={"number"}
                    value={rate}
                    readOnly={readOnly}
                    style={{
                      border: readOnly ? "none" : "2px solid #fff",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      background: "none",
                      color: theme.palette.text.primary,
                    }}
                    onChange={(event) => setRate(event.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant={"subtitle2"}>Role:</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant={"subtitle1"}>{role}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <Box
          sx={{ py: "10px", display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant={"contained"}
            color={"warning"}
            onClick={editProfile}
            sx={{
              display: readOnly ? "" : "none",
            }}
          >
            Edit
            <FontAwesomeIcon icon={faPen} style={{ marginLeft: "5px" }} />
          </Button>
          <Button
            variant={"contained"}
            color={"success"}
            onClick={saveProfile}
            sx={{
              display: readOnly ? "none" : "",
            }}
          >
            Save
            <FontAwesomeIcon
              icon={faCloudArrowUp}
              style={{ marginLeft: "5px" }}
            />
          </Button>

          <Button color={"error"} variant={"contained"} onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
