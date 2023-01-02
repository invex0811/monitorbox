import {
  faMoneyBill1Wave,
  faClock,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

const DRAWER_TOGGLE = "DRAWER_TOGGLE";

const navDrawerState = {
  navigationLinkItem: [
    {
      id: 1,
      to: "/salary",
      name: "Salary",
      src: "./images/money.jpg",
      icon: faMoneyBill1Wave,
    },
    {
      id: 2,
      to: "/gap&Unloading",
      name: "Gap&Unloading",
      src: "./images/calendar.jpg",
      icon: faCalendar,
    },
    {
      id: 3,
      to: "/timeCalculator",
      name: "Time calculator",
      src: "./images/clock.jpg",
      icon: faClock,
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
