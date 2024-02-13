import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queue: [],
  name: "",
  userUID: "",
};

const autommitSlicer = createSlice({
  name: "autocommit",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setUserUID: (state, action) => {
      state.userUID = action.payload;
    },
    addUsers: (state, action) => {
      state.queue = action.payload;
    },
  },
});

export const { viewBtn, setUserUID, setName, addUsers } =
  autommitSlicer.actions;

export default autommitSlicer.reducer;
