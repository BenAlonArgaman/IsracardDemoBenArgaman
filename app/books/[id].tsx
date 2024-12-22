import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetBooksQuery } from "@/state/books/booksApiSlice";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Book } from "@/types";
import useBookFavorite from "@/hooks/useBookFavorite";

// Memoized components for better performance
const BookStats = ({
  pages,
  releaseDate,
}: {
  pages: number;
  releaseDate: string;
}) => (
  <ThemedView className="flex-row justify-between mt-4 pb-4 border-b border-gray-200 dark:border-gray-700">
    <View className="items-center">
      <ThemedText className="text-gray-500 dark:text-gray-400">
        Pages
      </ThemedText>
      <ThemedText className="text-lg font-semibold">{pages}</ThemedText>
    </View>
    <View className="items-center">
      <ThemedText className="text-gray-500 dark:text-gray-400">
        Released
      </ThemedText>
      <ThemedText className="text-lg font-semibold">{releaseDate}</ThemedText>
    </View>
  </ThemedView>
);

export default function BookDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: books, isLoading, error } = useGetBooksQuery();

  const book = useMemo(
    () => books?.find((b: Book) => b.number === Number(id)),
    [books, id]
  );
  console.log("re-render");

  const { isFavorite, handleToggleFavorite } = useBookFavorite(book);

  if (isLoading) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ActivityIndicator
          size="large"
          accessibilityLabel="Loading book details"
        />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView className="flex-1 p-4">
        <ThemedText>Error loading book details</ThemedText>
      </ThemedView>
    );
  }

  if (!book) {
    return (
      <ThemedView className="flex-1 p-4">
        <ThemedText>Book not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1 bg-white dark:bg-gray-900">
      <View className="relative">
        <Image
          source={{ uri: book.cover }}
          style={{ width: "100%", height: 400 }}
          className="rounded-b-3xl"
          contentFit="cover"
          accessibilityLabel={`Cover image of ${book.title}`}
        />
        <TouchableOpacity
          onPress={handleToggleFavorite}
          className="absolute top-12 right-4 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full"
          accessibilityLabel={`${
            isFavorite ? "Remove from" : "Add to"
          } favorites`}
          accessibilityRole="button"
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={28}
            color={isFavorite ? "#ef4444" : "#666"}
          />
        </TouchableOpacity>
      </View>

      <ThemedView className="flex-1 px-4 pt-6 -mt-8 rounded-t-3xl bg-white dark:bg-gray-900">
        <ThemedText className="text-3xl font-bold">{book.title}</ThemedText>
        <ThemedText className="text-gray-500 dark:text-gray-400 text-lg mt-1">
          {book.originalTitle}
        </ThemedText>

        <BookStats pages={book.pages} releaseDate={book.releaseDate} />

        <ThemedView className="mt-4">
          <ThemedText className="text-lg font-semibold mb-2">
            Description
          </ThemedText>
          <ThemedText className="text-gray-600 dark:text-gray-300 leading-6">
            {book.description}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
