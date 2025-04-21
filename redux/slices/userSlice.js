import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    name: '',
    role: '',
    phone: '',
    token: ''
  },
  reducers: {
    doLogin: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
        phone: action.payload.phone,
        token: action.payload.token,
      };
    },
    doLogout: (state, action) => {
      return {
        ...state,
        email: null,
        name: null,
        role: null,
        phone: null,
        token: null,
      };
    },
  },
});

export const { doLogin, doLogout } = userSlice.actions;

export default userSlice.reducer;
