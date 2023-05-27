const SENT_ALERT = "SENT_ALERT";
const CLOSE_ALERT = "CLOSE_ALERT";

const alertState = {
  alert: {
    severity: "",
    title: "",
    value: "",
    show: false,
  },
};

export const alertReducer = (state = alertState, action) => {
  switch (action.type) {
    case SENT_ALERT:
      return {
        ...state,
        alert: {
          severity: action.severity,
          title: action.title,
          value: action.value,
          show: true,
        },
      };

    case CLOSE_ALERT:
      return {
        ...state,
        alert: {
          show: false,
        },
      };

    default:
      return state;
  }
};
