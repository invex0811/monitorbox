import MainLayout from "../../Layout/MainLayout";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { register } from "../Auth/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const forward = useNavigate();

  const registerUser = () => {
    register(email, password);
  };

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
          <Typography variant={"h4"}>Register</Typography>
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
            onClick={registerUser}
          >
            Register
          </Button>
          <Box
            sx={{
              display: "flex",
              mt: "10px",
            }}
          >
            <Typography>You have account?</Typography>
            <NavLink to={"/login"} style={{ textDecoration: "none" }}>
              <Typography variant={"subtitle2"} textTransform={"uppercase"}>
                Login
              </Typography>
            </NavLink>
          </Box>
        </Card>
      </Box>
    </MainLayout>
  );
};

export default Register;
