import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: {
    severity: "",
    title: "",
    value: "",
    show: false,
  },
};
export const alertSlicer = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.alert = action.payload;
    },
    closeAlert: (state, action) => {
      state.alert = { show: false };
    },
  },
});

export const { showAlert, closeAlert } = alertSlicer.actions;

export default alertSlicer.reducer;
