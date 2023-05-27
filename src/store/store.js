import { combineReducers, createStore } from "redux";
import { navDrawerReducer } from "./reducers/navDrawerReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { salaryReducer } from "./reducers/salaryReducer";
import { userReducer } from "./reducers/userReducer";
import { alertReducer } from "./reducers/alertReducer";

const rootReducer = combineReducers({
  navDrawerReducer,
  salaryReducer,
  userReducer,
  alertReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
