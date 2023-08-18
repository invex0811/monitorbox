import Header from "../components/Header/Header";
import NavigationDrawer from "../components/NavigationDrawer/NavigationDrawer";
import {
  Container,
  Alert,
  AlertTitle,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";

const MainLayout = (props) => {
  const alertData = useSelector((state) => state.alertReducer);
  const theme = useTheme();
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
      <Typography
        variant={"caption"}
        sx={{ position: "absolute", bottom: "0", right: "0" }}
      >
        Version: 2.0.1
      </Typography>
    </>
  );
};

export default MainLayout;
