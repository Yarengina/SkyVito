import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../utils/constants'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().token.access_token
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: build.mutation({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    refreshToken: build.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'PUT',
        body,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
} = authApi
