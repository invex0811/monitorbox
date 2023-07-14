import {
  Container,
  Alert,
  AlertTitle,
  Slide,
  AppBar,
  Toolbar,
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

  const alertData = useSelector((state) => state.alertReducer);
  return (
    <>
      <section>
        <AppBar sx={{ bgcolor: "white" }}>
          <Toolbar sx={{ display: "flex", alignItems: "center" }}>
            <NavLink
              to={"/"}
              style={{
                textDecoration: "none",
                color: "#16253B",
                margin: "0 20px 0 10px",
              }}
              onMouseEnter={springHome}
            >
              <animated.div style={{ ...props }}>
                <FontAwesomeIcon icon={faHome} style={{ fontSize: "25px" }} />
              </animated.div>
            </NavLink>
          </Toolbar>
        </AppBar>
      </section>
      <Container sx={{ height: "100vh", paddingTop: "70px" }}>
        {otherProps.children}
      </Container>
      <Slide direction="left" in={alertData.alert.show}>
        <Alert
          severity={alertData.alert.severity}
          sx={{
            position: "fixed",
            top: "100px",
            right: "0px",
            minWidth: "300px",
            maxWidth: "400px",
          }}
        >
          <AlertTitle>{alertData.alert.title}</AlertTitle>
          {alertData.alert.value}
        </Alert>
      </Slide>
    </>
  );
};

export default LoginRegisterLayout;
