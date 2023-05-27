import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Salary from "./components/Salary/Salary";
import GapUnloading from "./components/GapUnloading/GapUnloading";
import TimeCalculator from "./components/TimeCalculator/TimeCalculator";
import Login from "./components/Login/Login";
import TabsProfile from "./components/TabsProfile/TabsProfile";
import Register from "./components/Register/Register";
import SalaryStatistic from "./components/TabsProfile/Statistic/SalaryStatistic/SalaryStatistic";
import Profile from "./components/TabsProfile/Profile/Profile";
import Statistic from "./components/TabsProfile/Statistic/Statistic";
import SpeedCalculator from "./components/SpeedCalc/SpeedCalculator";

function App(props) {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/salary"} element={<Salary />} />
        <Route path={"/gap&unloading"} element={<GapUnloading />} />
        <Route path={"/timeCalculator"} element={<TimeCalculator />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/tabsProfile"} element={<TabsProfile />}>
          <Route path={"profile"} element={<Profile />} />
          <Route path={"statistic"} element={<Statistic />} />
        </Route>
        <Route
          path={"/tabsProfile/statistic/salaryStatistic"}
          element={<SalaryStatistic />}
        />
        <Route path={"/speedCalculator"} element={<SpeedCalculator />} />
      </Routes>
    </div>
  );
}

export default App;
