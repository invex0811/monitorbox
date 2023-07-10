import LoginRegisterLayout from "../../../Layout/LoginRegisterLayout";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const forward = useNavigate();
  const auth = getAuth();
  const sendPasswordEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        dispatch({
          type: "SENT_ALERT",
          severity: "success",
          title: "Success",
          value: "Email sent",
        });
        setTimeout(() => {
          dispatch({
            type: "CLOSE_ALERT",
          });
        }, 3000);
        forward("/");
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

  return (
    <LoginRegisterLayout>
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
            minWidth: "500px",
          }}
        >
          <Typography variant={"h4"}>Reset password</Typography>
          <TextField
            sx={{ my: "10px", width: "25ch" }}
            variant={"outlined"}
            label={"Email"}
            onChange={(event) => setEmail(event.target.value)}
          />

          <Button
            variant={"contained"}
            sx={{ mt: "10px" }}
            onClick={sendPasswordEmail}
          >
            Reset
          </Button>
        </Card>
      </Box>
    </LoginRegisterLayout>
  );
};

export default ResetPassword;
