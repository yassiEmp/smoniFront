export type TimeSlotStatus = 'occupe' | 'libre' | 'ferme';

export interface TimeSlot {
    user?: {
        name: string;
        avatarUrl: string;
    };
    status: TimeSlotStatus;
    day: string;
    hourstart: number;
    hourend: number;
}
