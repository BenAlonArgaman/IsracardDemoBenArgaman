import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "@/types";
import { RootState } from "@/state/store";

interface BooksState {
  favorites: Book[];
}

const initialState: BooksState = {
  favorites: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Book>) => {
      const index = state.favorites.findIndex(
        (book) => book.number === action.payload.number
      );
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
    },
  },
  selectors: {
    selectFavorites: (state) => state.favorites,
  },
});

export const { toggleFavorite } = booksSlice.actions;
export default booksSlice.reducer;

export const selectFavorites = (state: RootState) => state.books.favorites;
