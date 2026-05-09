import { VehicleType, MeetingPointTypeAttributes, ScheduleSlot, ApprenantMonitorType, ApointmentType, ModuleType } from "./settings/configuration";

export interface MonitorState {
    vehicles: VehicleType[];
    locations: MeetingPointTypeAttributes[];
    apprenants: ApprenantMonitorType[];
    availabilities: ScheduleSlot[];
    apointments: ApointmentType[];
    modules: ModuleType[];
}

export const MonitorInitialState: MonitorState = {
    vehicles: [],
    locations: [],
    apprenants: [],
    availabilities: [],
    apointments: [],
    modules: []
};
