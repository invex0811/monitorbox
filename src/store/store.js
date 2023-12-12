import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./slicer/alertSlicer";
import navigationReducer from "./slicer/navigationSlicer";
import todosReducer from "./slicer/todosSlicer";
import autocommitReducer from "./slicer/autocommitQueue";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    navigation: navigationReducer,
    todos: todosReducer,
    autocommit: autocommitReducer,
  },
});
