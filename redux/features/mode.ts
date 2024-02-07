import { createSlice } from '@reduxjs/toolkit'

export enum APP_MODE {
  SCUBA_DIVING = 'SCUBA_DIVING',
  DEMO = 'DEMO',
}

export type Mode = { appMode: APP_MODE }

const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    appMode: '',
  },
  reducers: {
    setMode: (state, action) => {
      state.appMode = action.payload.appMode
    },
  },
})

export const { setMode } = modeSlice.actions
export const modeReducer = modeSlice.reducer
