import React, { useMemo } from "react";
import { selectFavorites } from "@/state/books/booksSlice";
import { useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";
import BookItem from "@/components/BookItem";
import { useLocalSearchParams } from "expo-router";
import { sortBooks } from "@/hooks/sortBooks";

const Page = () => {
  const favorites = useSelector(selectFavorites);
  const { q: searchQuery, sort } = useLocalSearchParams<{
    q: string;
    sort?: string;
  }>();

  const filteredFavorites = useMemo(() => {
    if (!searchQuery) return favorites;

    const query = searchQuery.toLowerCase();
    return favorites.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
    );
  }, [favorites, searchQuery]);

  const sortedFavorites = useMemo(() => {
    return sortBooks(filteredFavorites, sort);
  }, [filteredFavorites, sort]);

  return (
    <FlashList
      contentInsetAdjustmentBehavior="automatic"
      data={sortedFavorites}
      contentContainerStyle={{ paddingBottom: 100 }}
      renderItem={({ item }) => <BookItem book={item} />}
      keyExtractor={(item) => item.number.toString()}
      estimatedItemSize={80}
    />
  );
};

export default Page;
