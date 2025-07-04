import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://assignment-3-tau-dusky.vercel.app/api' }),
  tagTypes: ['Borrow', 'Book'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: '/borrow',
        method: 'POST',
        body: borrowData,
      }),
      invalidatesTags: ['Borrow', 'Book'],
    }),
   
getTopBorrow: builder.query({
  query: () => '/borrow/top',
  providesTags: ['Borrow'],
}),

    getBorrowSummary: builder.query({
      query: ({ page = 1, limit = 4 }) => `/borrow?page=${page}&limit=${limit}`,
      providesTags: ['Borrow'],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery , useGetTopBorrowQuery} = borrowApi;
