import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Book } from "@/types";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useRouter } from "expo-router";

const BookItem = ({ book }: { book: Book }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/books/${book.number}`);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <ThemedView className="flex-row border-b border-gray-200 items-center p-4 gap-4 justify-between">
        <Image
          source={{ uri: book.cover }}
          style={{ width: 100, height: 100, borderRadius: 10 }}
        />
        <ThemedView className="flex-1">
          <ThemedText className="text-lg text-left font-bold">
            {book.title}
          </ThemedText>
          <ThemedText className="text-sm text-left text-gray-500">
            {book.releaseDate}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};

export default BookItem;
