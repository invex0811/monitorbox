import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Salary from "./components/Salary/Salary";
import GapUnloading from "./components/GapUnloading/GapUnloading";
import TimeCalculator from "./components/TimeCalculator/TimeCalculator";
import Login from "./components/Auth/Login/Login";
import TabsProfile from "./components/TabsProfile/TabsProfile";
import Register from "./components/Auth/Register/Register";
import SalaryStatistic from "./components/TabsProfile/Statistic/SalaryStatistic/SalaryStatistic";
import Profile from "./components/TabsProfile/Profile/Profile";
import Statistic from "./components/TabsProfile/Statistic/Statistic";
import SpeedCalculator from "./components/SpeedCalc/SpeedCalculator";
import Auth from "./components/Auth/Auth.jsx";
import ResetPassword from "./components/Auth/ResetPassword/ResetPassword";
import RoadMap from "./components/RoadMap/RoadMap";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Todos from "./components/Todos/Todos";
import AutocomitQueue from "./components/AutocomitQueue/AutocomitQueue";
function App(props) {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="App">
                    <Routes>
                        <Route path={"/"} element={<Home />} />
                        <Route path={"/salary"} element={<Salary />} />
                        <Route
                            path={"/gap&unloading"}
                            element={<GapUnloading />}
                        />
                        <Route
                            path={"/timeCalculator"}
                            element={<TimeCalculator />}
                        />
                        <Route path={"/auth"} element={<Auth />}>
                            <Route path={"login"} element={<Login />} />
                            <Route path={"register"} element={<Register />} />
                        </Route>
                        <Route
                            path={"/resetPassword"}
                            element={<ResetPassword />}
                        />
                        <Route path={"/tabsProfile"} element={<TabsProfile />}>
                            <Route path={"profile"} element={<Profile />} />
                            <Route path={"statistic"} element={<Statistic />} />
                        </Route>
                        <Route
                            path={"/tabsProfile/statistic/salaryStatistic"}
                            element={<SalaryStatistic />}
                        />
                        <Route
                            path={"/speedCalculator"}
                            element={<SpeedCalculator />}
                        />
                        <Route path={"/roadMap"} element={<RoadMap />} />
                        <Route path={"/todo"} element={<Todos />} />
                        <Route
                            path={"/autocomitQueue"}
                            element={<AutocomitQueue />}
                        />
                    </Routes>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
