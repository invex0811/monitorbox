import {
  faMoneyBill1Wave,
  faClock,
  faCalendar,
  faGaugeHigh,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";

const DRAWER_TOGGLE = "DRAWER_TOGGLE";
const THEME_TOGGLE = "THEME_TOGGLE";

const navDrawerState = {
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
  ],
};

export const navDrawerReducer = (state = navDrawerState, action) => {
  switch (action.type) {
    case DRAWER_TOGGLE:
      return { ...state, openToggle: action.payload };

    default:
      return state;
  }
};
