export interface InstructorProfile {
  id: number;
  user_id: number;
  specialty: string | null;
  bio: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  solde: number;
  certification_number: string | null;
  certification_issue_date: string | null;
  created_at: string;
  updated_at: string;
  hourPrice: number;
  hourDiscount: number;
  tva: number;
  juridic_form: string | null;
  siret: string | null;
  num_activity: string | null;
  num_tva: string | null;
  num_teach_authorization: string | null;
  date_teach_permit: string | null;
  date_medical_visit: string | null;
}

export interface MonitorType {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  email_verified_at: string | null;
  phone: string;
  genre: string | null;
  role: string;
  is_active: number;
  photo: string | null;
  created_at: string;
  updated_at: string;
  timing: string | null;
  first_login_planning: number;
  first_login_dashboard: number;
  instructor_profile: InstructorProfile;
}

export interface AdminType {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
  genre: string | null;
  role: string;
  is_active: number;
  photo: string | null;
  created_at: string;
  updated_at: string;
  timing: string | null;
  first_login_planning: number;
  first_login_dashboard: number;
}


export interface LearnerType {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
  genre: string | null;
  role: string;
  is_active: number;
  photo: string | null;
  created_at: string;
  updated_at: string;
  timing: string | null;
  first_login_planning: number;
  first_login_dashboard: number;
}


export interface MonitorShortType {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
  genre: string | null;
  role: string;
  is_active: number;
  photo: string | null;
  created_at: string;
  updated_at: string;
  timing: string | null;
  first_login_planning: number;
  first_login_dashboard: number;
}


export interface ExamenType {
  id: number;
  instructor_id: number;
  learner_id: number;
  date: string;
  status: string;
  created_at: string;
  updated_at: string;
  datetime: string
  learner: LearnerType;
  monitor: MonitorShortType;
}

export interface MonitorListPagination {
  current_page: number;
  data: MonitorType[];
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
}

export interface AdminListPagination {
  current_page: number;
  data: AdminType[];
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
}

export interface ExamenListPagination {
  current_page: number;
  data: ExamenType[];
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
}

export interface AdminMonitorState {
  monitors: MonitorListPagination;
  admins: AdminListPagination;
  examens: ExamenListPagination;
}

export const AdminMonitorInitialState: AdminMonitorState = {
  monitors: {
    current_page: 1,
    data: [],
    first_page_url: '',
    from: 0,
    last_page: 1,
    last_page_url: '',
    links: [],
    next_page_url: null,
    path: '',
    per_page: 10,
    prev_page_url: null,
    to: 0,
    total: 0,
  },
  admins: {
    current_page: 1,
    data: [],
    first_page_url: '',
    from: 0,
    last_page: 1,
    last_page_url: '',
    links: [],
    next_page_url: null,
    path: '',
    per_page: 10,
    prev_page_url: null,
    to: 0,
    total: 0,
  }, 
  examens: {
    current_page: 1,
    data: [],
    first_page_url: '',
    from: 0,
    last_page: 1,
    last_page_url: '',
    links: [],
    next_page_url: null,
    path: '',
    per_page: 10,
    prev_page_url: null,
    to: 0,
    total: 0,
  }
};
