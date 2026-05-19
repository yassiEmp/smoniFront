import { createSlice } from '@reduxjs/toolkit';
import { initialUser, initialAuthState } from '../../utils/types/initialState';

// Auth state now reflects only the user identity. The session cookie
// (set server-side by Fortify on /login) is what authenticates requests;
// the frontend never stores a credential.
export const authSlice = createSlice({
  name: 'authReducer',
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.test_passed = action.payload.test_passed ?? false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = initialUser;
      state.isAuthenticated = false;
      state.test_passed = false;
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    setTestPassed: (state, action) => {
      state.test_passed = action.payload;
    },
  },
});

export const { login, logout, updateUser, setTestPassed } = authSlice.actions;
export default authSlice.reducer;
