//import style from './Header.module.css';

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
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
        break;
      case "/salary":
        setTitleName("Salary");
        break;
      case "/gap&Unloading":
        setTitleName("Gap&Unloading");
        break;
      case "/timeCalculator":
        setTitleName("Time calculator");
        break;
      case "/tabsProfile/profile":
        setTitleName("Profile");
        break;
      case "/tabsProfile/statistic":
        setTitleName("Statistic");
        break;
      case "/auth":
        setTitleName("Auth");
        break;
      case "/speedCalculator":
        setTitleName("Speed calculator");
        break;
      case "/roadMap":
        setTitleName("Road map");
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

  return (
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
          <Typography variant={"h5"} color={"black"} sx={{ flexGrow: "1" }}>
            {titleName}
          </Typography>
          <NavLink
            to={"/auth/login"}
            style={{ textDecoration: "none", display: show ? "block" : "none" }}
          >
            <Button>Login</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </section>
  );
};

export default Header;
