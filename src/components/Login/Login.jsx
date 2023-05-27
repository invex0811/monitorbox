import { Box, Button, Card, TextField, Typography } from "@mui/material";
import MainLayout from "../../Layout/MainLayout";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const authentication = () => {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        dispatch({
          type: "SENT_ALERT",
          severity: "success",
          title: "Success",
          value: "Login successful",
        });
        setTimeout(() => {
          dispatch({
            type: "CLOSE_ALERT",
          });
        }, 3000);
      })
      .catch((e) => {
        dispatch({
          type: "SENT_ALERT",
          severity: "error",
          title: e.code,
          value: e.message,
        });
        setTimeout(() => {
          dispatch({
            type: "CLOSE_ALERT",
          });
        }, 3000);
      });
  };

  const forward = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        forward("/");
      }
    });
  });
  return (
    <MainLayout>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-50px",
        }}
      >
        <Card
          elevation={5}
          sx={{
            p: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "500px",
          }}
        >
          <Typography variant={"h4"}>Login</Typography>
          <TextField
            sx={{ my: "10px" }}
            variant={"outlined"}
            label={"Email"}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant={"outlined"}
            label={"Password"}
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button
            variant={"contained"}
            sx={{ mt: "10px" }}
            onClick={authentication}
          >
            Login
          </Button>
          <Box
            sx={{
              display: "flex",
              mt: "10px",
            }}
          >
            <Typography>You don`t have account?</Typography>
            <NavLink to={"/register"} style={{ textDecoration: "none" }}>
              <Typography variant={"subtitle2"} textTransform={"uppercase"}>
                Register
              </Typography>
            </NavLink>
          </Box>
        </Card>
      </Box>
    </MainLayout>
  );
};

export default Login;
