export const USER_INFO = "USER_INFO";

const userState = {
  user: {
    status: false,
    name: "",
    email: "",
    role: "",
    photo: "",
  },
};
export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        user: {
          status: action.payloadStatus,
          name: action.payloadName,
          email: action.payloadEmail,
          role: action.payloadRole,
          photo: action.payloadPhoto,
        },
      };
    default:
      return state;
  }
};
