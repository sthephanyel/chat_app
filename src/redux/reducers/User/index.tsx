import {createSlice} from '@reduxjs/toolkit';

export interface UserState {
  user: {
    access_token: string;
    created_at: string;
    confirmed_at: string;
    email: string;
    email_confirmed_at: string;
    updated_at: string;
    avatar_url: string;
    full_name: string;
    name: string;
    picture: string;
    description: string;
  }
}

const initialState: UserState = {
  user: {
    access_token: "",
    created_at: "",
    confirmed_at: "",
    email: "",
    email_confirmed_at: "",
    updated_at: "",
    avatar_url: "",
    full_name: "",
    name: "",
    picture: "",
    description: "",
  }
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserGoogle: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {saveUserGoogle} = userSlice.actions;

export default userSlice.reducer;
