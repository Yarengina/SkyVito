import { configureStore } from '@reduxjs/toolkit'
import { adsApi } from '../API/adsApi'
import { usersApi } from '../API/usersApi'
import { authApi } from '../API/authApi'
import tokenReducer from './slices/tokenSlice'
import currentUserReducer from './slices/currentUserSlice'
import queryReducer from './slices/filteredAdsSlice'
import adsReducer from './slices/adsSlice'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    currentUser: currentUserReducer,
    query: queryReducer,
    ads: adsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [adsApi.reducerPath]: adsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(adsApi.middleware),
})
