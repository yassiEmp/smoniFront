import { createSlice } from "@reduxjs/toolkit";
import { MonitorInitialState } from "@/types/monitor/initialState";

const monitorSlice = createSlice({
    name: "monitor",
    initialState: MonitorInitialState,
    reducers: {
        setVehicles: (state, action) => {
            state.vehicles = action.payload;
        },
        setLocations: (state, action) => {
            state.locations = action.payload;
        },
        setAvailabilities: (state, action) => {
            state.availabilities = action.payload;
        },
        setApprenants: (state, action) => {
            state.apprenants = action.payload;
        },
        setApointments: (state, action) => {
            state.apointments = action.payload;
        },
        setModules: (state, action) => {
            state.modules = action.payload;
        },
        setLogoutMonitor: (state) => {
            state.vehicles = [];
            state.locations = [];
            state.availabilities = [];
            state.apprenants = [];
            state.apointments = [];
        },
    },
});

export const { 
    setVehicles, 
    setLocations, 
    setAvailabilities, 
    setApprenants, 
    setApointments,
    setModules,
    setLogoutMonitor,
} = monitorSlice.actions;

export default monitorSlice.reducer;
