import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Salary from "./components/Salary/Salary";
import GapUnloading from "./components/GapUnloading/GapUnloading";
import TimeCalculator from "./components/TimeCalculator/TimeCalculator";

function App(props) {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/salary"} element={<Salary />} />
        <Route path={"/gap&unloading"} element={<GapUnloading />} />
        <Route path={"/timeCalculator"} element={<TimeCalculator />} />
      </Routes>
    </div>
  );
}

export default App;
