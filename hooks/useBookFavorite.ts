import { Book } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites, toggleFavorite } from "@/state/books/booksSlice";
import { useMemo, useCallback } from "react";

function useBookFavorite(book: Book | undefined) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const isFavorite = useMemo(
    () =>
      book ? favorites.some((fav: Book) => fav.number === book.number) : false,
    [favorites, book]
  );

  const handleToggleFavorite = useCallback(() => {
    if (book) {
      dispatch(toggleFavorite(book));
    }
  }, [book, dispatch]);

  return { isFavorite, handleToggleFavorite };
}

export default useBookFavorite;
