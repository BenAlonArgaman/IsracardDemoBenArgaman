import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Book } from "@/types";
import {
  toggleFavorite as toggleFavoriteAction,
  selectFavorites,
} from "@/state/books/booksSlice";

export function useBookFavorites() {
  const [isFavorite, setIsFavorite] = useState(false);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  const toggleFavorite = (book: Book) => {
    dispatch(toggleFavoriteAction(book));
    setIsFavorite(!isFavorite);
  };

  const checkIsFavorite = (book: Book) => {
    const isBookFavorited = favorites.some(
      (fav: Book) => fav.number === book.number
    );
    setIsFavorite(isBookFavorited);
  };

  return {
    isFavorite,
    toggleFavorite,
    checkIsFavorite,
  };
}
