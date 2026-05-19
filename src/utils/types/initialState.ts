import { User, InstructorProfile } from './reduceType';

export const initialInstructorProfile: InstructorProfile = {
  address: '',
  bio: null,
  certification_issue_date: null,
  certification_number: null,
  city: '',
  created_at: '',
  id: 0,
  postal_code: null,
  solde: 0,
  specialty: null,
  updated_at: '',
  user_id: 0
};

export const initialUser: User = {
  created_at: '',
  email: '',
  firstname: '',
  id: 0,
  lastname: '',
  phone: '',
  genre: '',
  photo: '',
  address: '',
  city: '',
  postal_code: '',
  role: '',
  updated_at: '',
  instructor_profile: undefined,
  is_active: false,
};

// Token + tokenCreationTime removed: auth now uses Sanctum's HttpOnly
// session cookie (set by GET /sanctum/csrf-cookie + POST /login). The
// frontend never sees or stores the credential.
export const initialAuthState = {
  user: initialUser,
  test_passed: false,
  isAuthenticated: false,
};
