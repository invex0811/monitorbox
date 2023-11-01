import { createSlice } from "@reduxjs/toolkit";
import {
  faCalendar,
  faClock,
  faGaugeHigh,
  faMoneyBill1Wave,
  faRoad,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";

const initialState = {
  navigationLinkItem: [
    {
      id: 1,
      to: "/salary",
      name: "Salary",
      src: "./images/money.jpg",
      icon: faMoneyBill1Wave,
      phoneBar: "",
    },
    {
      id: 2,
      to: "/gap&Unloading",
      name: "Gap&Unloading",
      src: "./images/calendar.jpg",
      icon: faCalendar,
      phoneBar: "none",
    },
    {
      id: 3,
      to: "/timeCalculator",
      name: "Time calculator",
      src: "./images/clock.jpg",
      icon: faClock,
      phoneBar: "none",
    },
    {
      id: 4,
      to: "/speedCalculator",
      name: "Speed calculator",
      src: "./images/speed.jpg",
      icon: faGaugeHigh,
      phoneBar: "none",
    },
    {
      id: 5,
      to: "/roadMap",
      name: "Road map",
      src: "./images/usaMap.jpg",
      icon: faRoad,
      phoneBar: "none",
    },
    {
      id: 6,
      to: "/todo",
      name: "Todo",
      src: "./images/usaMap.jpg",
      icon: faRectangleList,
      phoneBar: "none",
    },
  ],
};
export const navigationSlicer = createSlice({
  name: "navigation",
  initialState,
  reducers: {},
});

export default navigationSlicer.reducer;
