import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
};

const globalSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { toggleModal, toggleDataModel, loginUser, logout } =
  globalSlice.actions;
export default globalSlice.reducer;
