import Header from "../components/Header/Header";
import NavigationDrawer from "../components/NavigationDrawer/NavigationDrawer";
import { Container, Alert, AlertTitle, Slide, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const MainLayout = (props) => {
  const alertData = useSelector((state) => state.alert.alert);
  return (
    <>
      <Header />
      <NavigationDrawer />
      <Container
        bgcolor={"background.default"}
        sx={{
          height: "100vh",
          paddingTop: "70px",
        }}
      >
        {props.children}
      </Container>
      <Slide direction="left" in={alertData.show}>
        <Alert
          severity={alertData.severity}
          sx={{
            position: "fixed",
            top: "100px",
            right: "0px",
            minWidth: "300px",
            maxWidth: "400px",
          }}
        >
          <AlertTitle>{alertData.title}</AlertTitle>
          {alertData.value}
        </Alert>
      </Slide>
      <Typography
        variant={"caption"}
        sx={{ position: "absolute", bottom: "0", right: "0" }}
      >
        Version: 2.1.0
      </Typography>
    </>
  );
};

export default MainLayout;
