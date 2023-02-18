import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../utils/constants'

export const adsApi = createApi({
  reducerPath: 'adsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().token.access_token
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (build) => ({
    getAds: build.query({
      query: (userId) => (userId ? `ads?user_id=${userId}` : 'ads'),
    }),

    getAd: build.query({
      query: (id) => `ads/${id}`,
    }),

    getComments: build.query({
      query: (id) => `ads/${id}/comments`,
    }),

    createAd: build.mutation({
      query: (body) => ({
        url: 'adstext',
        method: 'POST',
        body,
      }),
    }),

    deleteAd: build.mutation({
      query: (id) => ({
        url: `ads/${id}`,
        method: 'DELETE',
      }),
    }),

    updateAdImage: build.mutation({
      query: ({ id, body }) => ({
        url: `ads/${id}/image`,
        method: 'POST',
        body,
      }),
    }),

    deleteAdImage: build.mutation({
      query: ({ id, imgUrl }) => ({
        url: `ads/${id}/image?file_url=${imgUrl}`,
        method: 'DELETE',
      }),
    }),

    changeAdDetails: build.mutation({
      query: ({ id, body }) => ({
        url: `ads/${id}`,
        method: 'PATCH',
        body,
      }),
    }),

    createComment: build.mutation({
      query: ({ adId, body }) => ({
        url: `ads/${adId}/comments`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetAdsQuery,
  useGetAdQuery,
  useGetCommentsQuery,
  useCreateAdMutation,
  useCreateCommentMutation,
  useDeleteAdMutation,
  useDeleteAdImageMutation,
  useChangeAdDetailsMutation,
  useUpdateAdImageMutation,
} = adsApi
