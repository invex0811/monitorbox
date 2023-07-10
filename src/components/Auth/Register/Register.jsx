import MainLayout from "../../../Layout/MainLayout";
import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { register } from "../auth.js";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        elevation={5}
        sx={{
          p: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant={"h4"}>Register</Typography>
        <TextField
          sx={{ my: "10px", width: "25ch" }}
          variant={"outlined"}
          label={"Email"}
          onChange={(event) => setEmail(event.target.value)}
        />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
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
          <NavLink to={"/auth/login"} style={{ textDecoration: "none" }}>
            <Typography variant={"subtitle2"} textTransform={"uppercase"}>
              Login
            </Typography>
          </NavLink>
        </Box>
      </Card>
    </Box>
  );
};

export default Register;
