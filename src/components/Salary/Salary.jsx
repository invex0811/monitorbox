import { Box } from "@mui/material";
import Inputs from "./Inputs/Inputs";
import MainLayout from "../../Layout/MainLayout";
const Salary = (props) => {
    return (
        <MainLayout>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Inputs />
            </Box>
        </MainLayout>
    );
};

export default Salary;
