import { createSlice } from '@reduxjs/toolkit'

export const querySlice = createSlice({
  name: 'query',
  initialState: '',
  reducers: {
    setQuery: (state, action) => (state = action.payload),
  },
})

export const { setQuery } = querySlice.actions

export default querySlice.reducer
