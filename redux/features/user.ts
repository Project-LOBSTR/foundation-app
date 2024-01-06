import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    publickey: '',
  },
  reducers: {
    login: (state, action) => {
      state.publickey = action.payload
    },
  },
})

export const { login } = userSlice.actions
export const userReducer = userSlice.reducer
