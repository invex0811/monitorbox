import {combineReducers, createStore} from "redux";
import {navDrawerReducer} from "./reducers/navDrawerReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {salaryReducer} from "./reducers/salaryReducer";

const rootReducer = combineReducers({
    navDrawerReducer,
    salaryReducer
})

const store = createStore(rootReducer, composeWithDevTools())



export default store;





