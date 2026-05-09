export interface InstructorProfile {
  address: string;
  bio: string | null;
  certification_issue_date: string | null;
  certification_number: string | null;
  city: string;
  created_at: string;
  id: number;
  postal_code: string | null;
  solde: number;
  specialty: string | null;
  updated_at: string;
  user_id: number;
}

export interface User {
  created_at: string;
  email: string;
  firstname: string;
  id: number;
  instructor_profile?: InstructorProfile;
  lastname: string;
  phone: string;
  city?: string;
  postal_code?: string;
  role: string;
  address: string;
  updated_at: string;
  photo: string;
  genre: string;
  is_active: boolean | number;
}
