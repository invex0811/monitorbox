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
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

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
        setShowResetPassword(true);
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
        <Typography variant={"h4"}>Login</Typography>
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
                  // onMouseDown={handleMouseDownPassword}
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
          onClick={authentication}
        >
          Login
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: "10px",
          }}
        >
          <Box sx={{ display: showResetPassword ? "block" : "none" }}>
            <NavLink
              to={"/resetPassword"}
              style={{ textDecoration: "none", color: "red" }}
            >
              <Typography fontSize={"1.2rem"}>Forgot your password?</Typography>
            </NavLink>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>You don`t have account?</Typography>
            <NavLink to={"/auth/register"} style={{ textDecoration: "none" }}>
              <Typography variant={"subtitle2"} textTransform={"uppercase"}>
                Register
              </Typography>
            </NavLink>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
