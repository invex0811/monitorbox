import Tabs from "./Tabs/Tabs";
import { useSelector } from "react-redux";
import MainLayout from "../../Layout/MainLayout";
import { Box } from "@mui/material";

const Home = (props) => {
  const links = useSelector(
    (state) => state.navDrawerReducer.navigationLinkItem
  );

  const tab = links.map((item) => (
    <Tabs
      key={item.id}
      to={item.to}
      image={item.src}
      title={item.name}
      tabsPhone={item.phoneBar}
    />
  ));

  return (
    <MainLayout>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {tab}
      </Box>
    </MainLayout>
  );
};

export default Home;
