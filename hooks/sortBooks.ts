import { SORT_OPTIONS } from "@/components/SortMenu";
import { Book } from "@/types";

export function sortBooks(books: Book[], sortBy?: string) {
  if (!books || !sortBy) return books;

  return [...books].sort((a, b) => {
    switch (sortBy) {
      case SORT_OPTIONS.TITLE:
        return a.title.localeCompare(b.title);
      case SORT_OPTIONS.PAGES:
        return a.pages - b.pages;
      case SORT_OPTIONS.DATE:
        return (
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        );
      default:
        return 0;
    }
  });
}
