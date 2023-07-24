import { Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "@react-spring/web";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const location = useLocation();

  const [titleName, setTitleName] = useState("");
  const [show, setShow] = useState(true);
  const [title, setTitle] = useState("Home");
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setShow(false);
      } else {
        setShow(true);
      }
    });
  });
  useMemo(() => {
    switch (location.pathname) {
      case "/":
        setTitleName("Home");
        setTitle("Home");
        break;
      case "/salary":
        setTitleName("Salary");
        setTitle("Salary");
        break;
      case "/gap&Unloading":
        setTitleName("Gap&Unloading");
        setTitle("Gap&Unloading");
        break;
      case "/timeCalculator":
        setTitleName("Time calculator");
        setTitle("Time calculator");
        break;
      case "/tabsProfile/profile":
        setTitleName("Profile");
        setTitle("Profile");
        break;
      case "/tabsProfile/statistic":
        setTitleName("Statistic");
        setTitle("Statistic");
        break;
      case "/auth":
        setTitleName("Auth");
        setTitle("Auth");
        break;
      case "/speedCalculator":
        setTitleName("Speed calculator");
        setTitle("Speed calculator");
        break;
      case "/roadMap":
        setTitleName("Road map");
        setTitle("Road map");

        break;

      default:
        return;
    }
  }, [location]);

  //ANIMATION
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

  return (
    <section>
      <Box
        bgcolor={"background.paper"}
        sx={{
          position: "fixed",
          zIndex: "999",
          width: "100%",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          <NavLink
            to={"/"}
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
              margin: "0 20px 0 10px",
            }}
            onMouseEnter={springHome}
          >
            <animated.div style={{ ...props }}>
              <FontAwesomeIcon icon={faHome} style={{ fontSize: "25px" }} />
            </animated.div>
          </NavLink>
          <Typography variant={"h5"} color={"text"} sx={{ flexGrow: "1" }}>
            {titleName}
          </Typography>
          <NavLink
            to={"/auth/login"}
            style={{ textDecoration: "none", display: show ? "block" : "none" }}
          >
            <Button>Login</Button>
          </NavLink>
        </Toolbar>
      </Box>
    </section>
  );
};

export default Header;
