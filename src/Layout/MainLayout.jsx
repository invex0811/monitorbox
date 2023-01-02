import Header from "../components/Header/Header";
import NavigationDrawer from "../components/NavigationDrawer/NavigationDrawer";
import {Container} from "@mui/material";

const MainLayout = (props) => {
    return(
        <>
            <Header/>
            <NavigationDrawer/>
            <Container sx={{height: '100vh', paddingTop: '70px' }}>
                {props.children}
            </Container>
        </>
    )
}

export default MainLayout;