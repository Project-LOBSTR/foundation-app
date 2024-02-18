import { createSlice } from '@reduxjs/toolkit'

export type UserState = {
  publickey: string
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    publickey: '',
    privatekey: '',
  },
  reducers: {
    login: (state, action) => {
      state.publickey = action.payload.publickey
      state.privatekey = action.payload.privatekey
    },
    logout: (state) => {
      state.publickey = ''
      state.privatekey = ''
    },
  },
})

export const { login, logout } = userSlice.actions
export const userReducer = userSlice.reducer
