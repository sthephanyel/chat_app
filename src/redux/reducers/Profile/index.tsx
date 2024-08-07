import {createSlice} from '@reduxjs/toolkit';

export interface ProfileState {
  editProfile: boolean;
}

const initialState: ProfileState = {
  editProfile: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    editprofileUp: (state, action) => {
      state.editProfile = action.payload;
    },
  },
});

export const {editprofileUp} = profileSlice.actions;

export default profileSlice.reducer;
