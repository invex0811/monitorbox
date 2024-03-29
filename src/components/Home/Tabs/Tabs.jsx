import {
  CardContent,
  CardMedia,
  Typography,
  Card,
  Box,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import "./Tabs.css";
import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";

const Tabs = ({ to, image, title, tabsPhone }) => {
  const [hover, setHover] = useState(false);
  const hoverTab = useSpring({
    backgroundColor: hover ? "#679CF6" : "#292E33",
    color: hover ? "#000" : "#fff",
  });

  const theme = useTheme();
  return (
    <Box
      sx={{
        margin: "10px",
        [theme.breakpoints.down("sm")]: { display: tabsPhone },
      }}
    >
      <NavLink to={to} style={{ textDecoration: "none", color: "#000" }}>
        <Card
          sx={{ width: "300px", padding: "0px" }}
          onMouseEnter={() => setHover(!hover)}
          onMouseLeave={() => setHover(!hover)}
        >
          <CardMedia component="img" height="200px" image={image} alt="Money" />
          <animated.div style={{ ...hoverTab }}>
            <CardContent>
              <Typography variant="h4" align={"center"}>
                {title}
              </Typography>
            </CardContent>
          </animated.div>
        </Card>
      </NavLink>
    </Box>
  );
};

export default Tabs;
