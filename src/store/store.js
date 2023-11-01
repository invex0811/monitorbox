import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./slicer/alertSlicer";
import navigationReducer from "./slicer/navigationSlicer";
import todosReducer from "./slicer/todosSlicer";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    navigation: navigationReducer,
    todos: todosReducer,
  },
});
