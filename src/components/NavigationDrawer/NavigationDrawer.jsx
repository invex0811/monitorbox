import style from "./NavigationDrawer.module.css";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { animated, useSpring } from "@react-spring/web";
import Avatar from "../AvatarProfile/AvatarProfile";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../theme";

const NavigationDrawer = (props) => {
  const [toggle, setToggle] = useState(false);
  const [userName, setUserName] = useState("");

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        const database = getDatabase();
        const UID = getAuth().currentUser.uid;
        const refUser = ref(database, `users/${UID}/fullName`);
        onValue(refUser, (snapshot) => {
          setUserName(snapshot.val());
        });
      }
    });
  });
  const forward = useNavigate();
  const redirectToLogin = async () => {
    await onAuthStateChanged(getAuth(), (user) => {
      console.log(user);
      if (user) {
        return forward("/tabsProfile/profile");
      } else if (!user) {
        return forward("/auth/login");
      }
    });
  };
  const active = ({ isActive }) => (isActive ? style.active : style.navLink);

  const links = useSelector((state) => state.navigation.navigationLinkItem);
  //LOCATION

  //ANIMATIONS
  const [springs, api] = useSpring(() => ({ from: { x: -20, opacity: "0" } }));

  const animateOpenBar = useSpring({ width: toggle ? "220px" : "80px" });

  const activeAnimation = () => {
    api.start({
      from: {
        x: -20,
        opacity: "0",
      },
      to: {
        x: 0,
        opacity: "1",
      },
    });
  };

  const changeTheme = () => {
    colorMode.toggleColorMode();
    localStorage.setItem(
      "theme",
      theme.palette.mode === "light" ? "dark" : "light"
    );
  };

  const linksList = links.map((item) => (
    <Box
      sx={{
        [theme.breakpoints.down("sm")]: {
          display: item.phoneBar,
        },
      }}
    >
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
            <animated.div
              style={{
                ...springs,
              }}
            >
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
    </Box>
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
        zIndex: "900",
        //Адаптация под телефон
        [theme.breakpoints.down("sm")]: {
          position: "fixed",
          width: "100%",
          height: "64px",
          flexDirection: "row",
          bottom: "0",
          bgcolor: theme.palette.background.paper,
        },
      }}
    >
      <animated.div style={{ ...animateOpenBar }}>
        <Box
          bgcolor={"background.paper"}
          sx={{
            height: "100%",
            borderRadius: "20px",
            marginLeft: "10px",
            paddingTop: "10px",
            [theme.breakpoints.down("sm")]: {
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              marginLeft: "-45px",
              bgcolor: "rgba(0,0,0,0)",
              padding: "0",
            },
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
                [theme.breakpoints.down("sm")]: {
                  display: "none",
                },
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
          <Tooltip title={toggle ? "" : "Profile"} arrow placement={"right"}>
            <Box
              onClick={redirectToLogin}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: "10px",
                margin: "30px 15px 15px 13px",
                [theme.breakpoints.down("sm")]: { margin: "0 20px" },
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
                <Avatar />
              </Box>
              <animated.div style={{ ...springs }}>
                <Box
                  sx={{
                    color: "#7D859D",
                    display: toggle ? "" : "none",
                    paddingLeft: "10px",
                    minWidth: "200px",
                  }}
                >
                  {userName}
                </Box>
              </animated.div>
            </Box>
          </Tooltip>
          <Tooltip
            title={`Enable ${
              theme.palette.mode === "dark" ? "light theme" : "dark theme"
            }`}
            arrow
            placement={"right"}
          >
            <Box
              sx={{
                mb: "30px",
                ml: "15px",
                [theme.breakpoints.down("sm")]: {
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <IconButton onClick={changeTheme} color="inherit">
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Box>
          </Tooltip>
        </Box>
      </animated.div>
    </Box>
  );
};

export default NavigationDrawer;
