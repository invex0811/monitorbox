import LoginRegisterLayout from "../../Layout/LoginRegisterLayout";
import { Box } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import style from "./Auth.module.css";

const Auth = () => {
  const active = ({ isActive }) => (isActive ? style.active : style.tab);

  return (
    <LoginRegisterLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Box sx={{ width: "500px" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <NavLink
              className={active}
              style={{ borderRadius: "5px 0 0 0" }}
              to={"login"}
            >
              Login
            </NavLink>
            <NavLink
              className={active}
              style={{ borderRadius: "0 5px 0 0" }}
              to={"register"}
            >
              Register
            </NavLink>
          </Box>
          <Box>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </LoginRegisterLayout>
  );
};

export default Auth;
