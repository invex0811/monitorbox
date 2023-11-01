import {
  Container,
  Alert,
  AlertTitle,
  Slide,
  Toolbar,
  Box,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const LoginRegisterLayout = (otherProps) => {
  const [props, api] = useSpring(() => ({
    from: { transform: "rotateX(0deg)", y: 0 },
  }));
  const springHome = () => {
    api.start({
      from: { transform: "rotateX(0deg)", y: 0 },
      to: [
        { transform: "rotateX(45deg)", y: 10 },
        { transform: "rotateX(-45deg)", y: -10 },
        { transform: "rotateX(25deg)", y: 0 },
        { transform: "rotateX(0deg)", y: 0 },
      ],
    });
  };

  const theme = useTheme();

  const alertData = useSelector((state) => state.alert.alert);
  return (
    <>
      <section>
        <Box
          bgcolor={"background.paper"}
          sx={{
            position: "fixed",
            width: "100%",
            boxShadow:
              "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
          }}
        >
          <Toolbar sx={{ display: "flex", alignItems: "center" }}>
            <NavLink
              to={"/"}
              style={{
                textDecoration: "none",
                color: theme.palette.text.primary,
                margin: "0 20px 0 10px",
              }}
              onMouseEnter={springHome}
            >
              <animated.div style={{ ...props }}>
                <FontAwesomeIcon icon={faHome} style={{ fontSize: "25px" }} />
              </animated.div>
            </NavLink>
          </Toolbar>
        </Box>
      </section>
      <Container
        bgcolor={"background.default"}
        sx={{ height: "100vh", paddingTop: "70px" }}
      >
        {otherProps.children}
      </Container>
      <Slide direction="left" in={alertData.show}>
        <Alert
          severity={alertData.severity}
          sx={{
            position: "fixed",
            top: "100px",
            right: "0px",
            minWidth: "300px",
            maxWidth: "400px",
          }}
        >
          <AlertTitle>{alertData.title}</AlertTitle>
          {alertData.value}
        </Alert>
      </Slide>
    </>
  );
};

export default LoginRegisterLayout;
