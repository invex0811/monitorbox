import Header from "../components/Header/Header";
import NavigationDrawer from "../components/NavigationDrawer/NavigationDrawer";
import { Container, Alert, AlertTitle, Slide, Collapse } from "@mui/material";
import { useSelector } from "react-redux";

const MainLayout = (props) => {
  const alertData = useSelector((state) => state.alertReducer);
  return (
    <>
      <Header />
      <NavigationDrawer />
      <Container sx={{ height: "100vh", paddingTop: "70px" }}>
        {props.children}
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

export default MainLayout;
