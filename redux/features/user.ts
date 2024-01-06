import { createSlice } from '@reduxjs/toolkit'

export type UserState = {
  publickey: string
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    publickey: '',
  },
  reducers: {
    login: (state, action) => {
      state.publickey = action.payload
    },
    logout: (state) => {
      state.publickey = ''
    },
  },
})

export const { login, logout } = userSlice.actions
export const userReducer = userSlice.reducer
