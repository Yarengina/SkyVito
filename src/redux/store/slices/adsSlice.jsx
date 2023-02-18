import { createSlice } from '@reduxjs/toolkit'

export const adsSlice = createSlice({
  name: 'ads',
  initialState: [],
  reducers: {
    setAds: (state, action) =>
      (state = action.payload),
  },
})

export const { setAds } = adsSlice.actions

export default adsSlice.reducer
