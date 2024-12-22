import React, { useMemo } from "react";
import { FlashList } from "@shopify/flash-list";
import BookItem from "@/components/BookItem";
import { useLocalSearchParams } from "expo-router";
import {} from "@/state/books/booksSlice";
import { Book } from "@/types";
import { useGetBooksQuery } from "@/state/books/booksApiSlice";
import { sortBooks } from "@/hooks/sortBooks";

const Page = () => {
  const { data: books, isLoading, error } = useGetBooksQuery();
  const { q: searchQuery, sort } = useLocalSearchParams<{
    q: string;
    sort?: string;
  }>();

  const filteredBooks = useMemo(() => {
    if (!books) return [];
    if (!searchQuery) return books;

    return books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [books, searchQuery]);

  const sortedBooks = useMemo(
    () => sortBooks(filteredBooks, sort),
    [filteredBooks, sort]
  );

  if (isLoading) return null;
  if (error) return null;

  return (
    <FlashList
      contentInsetAdjustmentBehavior="automatic"
      data={sortedBooks}
      contentContainerStyle={{ paddingBottom: 100 }}
      renderItem={({ item }) => <BookItem book={item} />}
      keyExtractor={(item) => item.number.toString()}
      estimatedItemSize={100}
    />
  );
};

export default Page;
