import MainLayout from "../../Layout/MainLayout";
import { Box } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import style from "./TabsProfile.module.css";

const TabsProfile = () => {
  const active = ({ isActive }) => (isActive ? style.active : style.tab);

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Box>
          <NavLink
            className={active}
            style={{ borderRadius: "5px 0 0 5px" }}
            to={"profile"}
          >
            Profile
          </NavLink>
          <NavLink
            className={active}
            style={{ borderRadius: "0 5px 5px 0" }}
            to={"statistic"}
          >
            Statistic
          </NavLink>
        </Box>
      </Box>

      <Outlet />
    </MainLayout>
  );
};

export default TabsProfile;
