export interface MeetingPoint {
  id: number;
  instructor_id: number;
  label: string;
  address: string;
  city: string;
  postal_code: string;
  latitude: string;
  longitude: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Availability {
  id: number;
  instructor_id: number;
  meeting_point_id: number;
  vehicle_id: number;
  day_of_week: string;
  date: string;
  start_time: string;
  end_time: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  meeting_point: MeetingPoint;
}

export interface Learner {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  photo: string | null;
}

export interface Course {
  id: number;
  learner: Learner;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  price: string;
  availability: Availability;
}
