import { Book } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Creating the books API slice
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

// Export the hooks for the books API
export const { useGetBooksQuery } = booksApiSlice;
