import { createSlice } from '@reduxjs/toolkit'

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {},
  reducers: {
    setCurrentUser: (state, action) => (state = { ...action.payload }),
    updateCurrentUser: (state, action) => {
      return (state = {
        ...state,
        ...action.payload,
      })
    },
  },
})

export const { setCurrentUser, updateCurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer
