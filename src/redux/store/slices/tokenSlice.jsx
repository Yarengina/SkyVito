import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: { access_token: undefined, refresh_token: undefined },
  reducers: {
    setToken: (state, action) => {
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
    },
  },
})

export const { setToken } = tokenSlice.actions

export default tokenSlice.reducer
