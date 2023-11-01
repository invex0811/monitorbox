import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listItems: [],
};

const todosSlicer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addItemToList: (state, action) => {
      state.listItems.push(action.payload);
    },
    removeItemFromList: (state, action) => {
      state.listItems = state.listItems.filter(
        (obj) => obj.id !== action.payload
      );
    },
    completeTodo: (state, action) => {
      const findItem = state.listItems.find(
        (item) => item.id === action.payload
      );
      if (findItem) {
        findItem.completed = true;
        findItem.aside = false;
      }
    },
    asideTodo: (state, action) => {
      const findItem = state.listItems.find(
        (item) => item.id === action.payload
      );
      if (findItem) {
        findItem.aside = true;
      }
    },
    refreshTodo: (state, action) => {
      const findItem = state.listItems.find(
        (item) => item.id === action.payload
      );
      if (findItem) {
        findItem.completed = false;
      }
    },
  },
});

export const {
  addItemToList,
  removeItemFromList,
  completeTodo,
  asideTodo,
  refreshTodo,
} = todosSlicer.actions;
export default todosSlicer.reducer;
