import { AdminMonitorInitialState } from "@/types/admin/initialState";
import { createSlice } from "@reduxjs/toolkit";


const adminSlice = createSlice({
  name: "admin",
  initialState: AdminMonitorInitialState,
  reducers: {
    setMonitors: (state, action) => {
      state.monitors = action.payload;
    },
    setAdmins: (state, action) => {
      state.admins = action.payload
    },
    setExamens: (state, action) => {
      state.examens = action.payload
    }
  },
});

export const { setMonitors, setAdmins, setExamens } = adminSlice.actions;

export default adminSlice.reducer;