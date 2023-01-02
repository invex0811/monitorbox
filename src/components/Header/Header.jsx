//import style from './Header.module.css';

import { AppBar, Toolbar, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "@react-spring/web";

const Header = () => {
  const location = useLocation();

  let [titleName, setTitleName] = useState("");

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
          <Typography variant={"h5"} color={"black"}>
            {titleName}
          </Typography>
        </Toolbar>
      </AppBar>
    </section>
  );
};

export default Header;
