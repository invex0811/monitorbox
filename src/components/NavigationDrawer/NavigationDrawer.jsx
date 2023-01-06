import style from "./NavigationDrawer.module.css";
import { Box, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { animated, useSpring } from "@react-spring/web";

const NavigationDrawer = (props) => {
  const [toggle, setToggle] = useState(false);

  const active = ({ isActive }) => (isActive ? style.active : style.navLink);

  const links = useSelector(
    (state) => state.navDrawerReducer.navigationLinkItem
  );
  //LOCATION

  //ANIMATIONS
  const [springs, api] = useSpring(() => ({ from: { x: -50 } }));

  const animateOpenBar = useSpring({ width: toggle ? "220px" : "80px" });

  const activeAnimation = () => {
    api.start({
      from: {
        x: -50,
        opacity: "0",
      },
      to: {
        x: 0,
        opacity: "1",
      },
    });
  };

  const linksList = links.map((item) => (
    <NavLink className={active} key={item.id} to={item.to}>
      <Tooltip title={toggle ? "" : item.name} arrow placement={"right"}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              height: "25px",
              width: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={item.icon} fontSize={20} />
          </Box>
          <animated.div style={{ ...springs }}>
            <Box
              sx={{
                display: toggle ? "" : "none",
                paddingLeft: "10px",
                minWidth: "200px",
              }}
            >
              {item.name}
            </Box>
          </animated.div>
        </Box>
      </Tooltip>
    </NavLink>
  ));

  return (
    <Box
      sx={{
        position: "absolute",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <animated.div style={{ ...animateOpenBar }}>
        <Box
          sx={{
            background: "#16253B",
            height: "100%",
            borderRadius: "20px",
            marginLeft: "10px",
            paddingTop: "10px",
          }}
        >
          <Tooltip title={toggle ? "" : "Menu"} arrow placement={"right"}>
            <Box
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: "10px",
                margin: "15px 15px 30px 15px",
              }}
              onClick={() => {
                setToggle(!toggle);
                activeAnimation();
              }}
            >
              <Box
                sx={{
                  height: "25px",
                  width: "25px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faBars}
                  fontSize={20}
                  color={"#7D859D"}
                />
              </Box>
              <animated.div style={{ ...springs }}>
                <Box
                  sx={{
                    color: "#7D859D",
                    display: toggle ? "" : "none",
                    paddingLeft: "10px",
                  }}
                >
                  Menu
                </Box>
              </animated.div>
            </Box>
          </Tooltip>
          {linksList}
        </Box>
      </animated.div>
    </Box>
  );
};

export default NavigationDrawer;
