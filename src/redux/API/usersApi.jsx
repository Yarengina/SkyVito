import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../utils/constants'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().token.access_token
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (build) => ({
    getUser: build.query({
      query: () => 'user',
    }),

    updateUserDetails: build.mutation({
      query: (body) => ({
        url: 'user',
        method: 'PATCH',
        body,
      }),
    }),
    
    updateUserAvatar: build.mutation({
      query: (body) => ({
        url: 'user/avatar',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetUserQuery,
  useUpdateUserDetailsMutation,
  useUpdateUserAvatarMutation,
} = usersApi
