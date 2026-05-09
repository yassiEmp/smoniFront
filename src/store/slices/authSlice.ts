import { createSlice } from '@reduxjs/toolkit';
import { initialUser, initialAuthState } from '../../utils/types/initialState';

// Création du slice
export const authSlice = createSlice({
  name: 'authReducer',
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.test_passed = action.payload.test_passed;
      state.tokenCreationTime = Date.now();
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = '';
      state.tokenCreationTime = null;
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