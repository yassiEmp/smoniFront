
export interface LearnerProfileComplete {
  success: boolean;
  data: {
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
    timing: any;
    first_login_planning: number;
    first_login_dashboard: number;
    learner_profile: {
      id: number;
      user_id: number;
      birthdate: string | null;
      city: string | null;
      address: string | null;
      postal_code: string | null;
      cin_number: string | null;
      cin_issue_date: string | null;
      cin_issue_place: string | null;
      permit_number: string | null;
      permit_issue_date: string | null;
      permit_category: string | null;
      created_at: string;
      updated_at: string;
      test_passed: number;
      hour: number;
      identity: File,
      accommodation: File,
      authorize: File,
      identityPhoto: File,
      assr: File,
      cip: File,
      medicalVisit: File,
      snu: File,
      neph: string | null;
    };
  };
  message: string;
}

// Mettre à jour votre interface User
export interface User {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  genre: string | null;
  photo: string | null;
  address: string | null;
  role: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  learner_profile?: {
    birthdate: string | null;
    city: string | null;
    postal_code: string | null;
    cin_number: string | null;
    cin_issue_date: string | null;
    cin_issue_place: string | null;
    permit_number: string | null;
    permit_issue_date: string | null;
    permit_category: string | null;
    test_passed: number;
    hour: number;
  };
}


export interface LearnerProfileUpdate {
  lastname: string;
  firstname: string;
  phone: string;
  genre: string;
  birthdate?: string;
  address?: string;
  postal_code?: string;
  cin_number?: string;
  cin_issue_date?: string;
  cin_issue_place?: string;
  permit_number?: string;
  permit_issue_date?: string;
  permit_category?: string;                
}


export interface LearnerProfileResponse {
  success: boolean;
  data: string;
  message: string;
}
