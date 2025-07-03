import type { IBook } from '@/components/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://assignment-3-tau-dusky.vercel.app/api' }),
  tagTypes: ['Book'],
  endpoints: (builder) => ({
getBooks: builder.query<{ data: IBook[]; total: number },{ page?: number; limit?: number; search?: string }>({
  query: ({ page = 1, limit = 10, search = "" } = {}) => {
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    if (search) params.append("search", search);

    return `/books?${params.toString()}`;
  },
  providesTags: ["Book"],
}),

    getBookById: builder.query({
      query: (id) => `/books/${id}`,
        providesTags: ["Book"]
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Book'],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: patch,
               
      }),
      invalidatesTags: ['Book']
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
