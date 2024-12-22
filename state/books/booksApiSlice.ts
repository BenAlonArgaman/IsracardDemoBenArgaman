import { Book } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApiSlice = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://potterapi-fedeperin.vercel.app/en",
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => "/books",
      providesTags: ["Books"],
      transformResponse: (response: Book[]) =>
        response.map((book) => ({
          ...book,
          isFavorite: false,
        })),
    }),
  }),
});

export const { useGetBooksQuery } = booksApiSlice;
