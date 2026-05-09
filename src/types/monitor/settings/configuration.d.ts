export interface PaginationResponse1 {
  data: any[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}


export interface VehicleType {
  id: number;
  instructor_id: number;
  brand: string;
  model: string;
  year: number;
  plate_number: string;
  fuel_type: "essence" | "diesel" | "électrique" | "hybride";
  insurance_expiry?: string | null;
  technical_inspection_date?: string | null;
  photo_url?: string | null;
  color?: string;
  gearbox_type: "manual" | "automatic";
  status?: "available" | "unavailable" | "maintenance";
  created_at: string | null;
  updated_at: string | null;
}

export interface MeetingPointType {
  id?: number;
  label: string;
  address: string;
  city: string;
  postal_code: string;
  latitude: number;
  longitude: number;
}

export interface ApprenantMonitorType {
  id: number;
  learner: LearnerType;
  hour_estimate: number
  total_duration: number;
  status: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export interface LearnerType {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  email_verified_at: string | null;
  phone: string;
  genre: string | null;
  role: string;
  is_active: boolean;
  photo: string;
  created_at: string;
  updated_at: string;
  timing: string | null;
}

export interface MeetingPointTypeAttributes {
  id: number;
  instructor_id?: number;
  label: string;
  address: string;
  city: string;
  postal_code: string | null;
  latitude: number | string;
  longitude: number | string;
  is_active?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
}
export interface Learner {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  email_verified_at: string | null;
  phone: string;
  genre: string | null;
  role: string;
  is_active: boolean;
  photo: string | null;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: number;
  learner_id: number;
  instructor_id: number;
  availability_id: number;
  vehicle_id: number;
  date: string;
  start_time: string;
  end_time: string;
  duration: number;
  status: 'scheduled' | 'cancelled' | 'completed' | 'confirmed' | 'pending';
  cancellation_reason: string | null;
  price: string;
  lesson_notes: {
    observation: string;
  };
  presence_student: boolean;
  presence_monitor: boolean;
  finished: boolean;
  tag: string | null;
  created_at: string;
  updated_at: string;
  learner: Learner;
}

export interface ScheduleSlot {
  id: number;
  instructor_id: number;
  meeting_point_id: number;
  vehicle_id: number;
  day_of_week: string;
  date: string;
  start_time: string;
  end_time: string;
  status: boolean;
  created_at: string | null;
  updated_at: string | null;
  meeting_point: MeetingPointTypeAttributes;
  vehicle: VehicleType;
  appointment?: Appointment;
}

export interface ApointmentType {
  id: number;
  learner_id: number;
  instructor_id: number;
  availability_id: number;
  vehicle_id: number;
  date: string;
  start_time: string;
  end_time: string;
  duration: number;
  status: string;
  cancellation_reason: string | null;
  price: string;
  lesson_notes: string | null;
  presence_student: boolean;
  presence_monitor: boolean;
  finished: boolean;
  tag: string;
  created_at: string;
  updated_at: string;
  canceled_by_monitor: string | null;
  reason: string | null;
  learner: LearnerType;
}

export interface LessonType {
  id: number;
  learner_id: number;
  instructor_id: number;
  availability_id: number;
  vehicle_id: number;
  date: string;
  start_time: string;
  end_time: string;
  duration: number;
  cancellation_reason: string | null;
  price: string;
  lesson_notes: string | null;
  presence_student: boolean;
  presence_monitor: boolean;
  finished: boolean;
  tag: string | null;
  created_at: string;
  updated_at: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  canceled_by_monitor: boolean | null;
  reason: string | null;
  instructor: {
    id: number;
    lastname: string;
    firstname: string;
    email: string;
    email_verified_at: string;
    phone: string;
    genre: string;
    role: string;
    is_active: boolean;
    photo: string;
    created_at: string;
    updated_at: string;
    timing: string | null;
  };
}

export interface CommentType {
  id: number;
  monitor_id: number;
  student_id: number;
  module_id: number | null;
  module_step_id: number | null;
  comment: string;
  date: string | null;
  created_at: string;
  updated_at: string;
  monitor: {
    id: number;
    lastname: string;
    firstname: string;
    photo: string | null;
  };
}

export interface CommentResponse {
  success: boolean;
  data: {
    current_page: number;
    data: CommentType[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export interface CompetenceType {
  id: number;
  name: string;
  is_check: boolean;
}

export interface SubModuleType {
  id: number;
  code: string;
  name: string;
  stat: number;
  competence: CompetenceType[];
}

export interface ModuleType {
  id: number;
  code: string;
  name: string;
  stat: number;
  subModule: SubModuleType[];
}

export interface ModuleResponse {
  success: boolean;
  data: ModuleType[];
}