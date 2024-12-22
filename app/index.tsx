import Loading from "@/components/Loading";
import { useGetBooksQuery } from "@/state/books/booksApiSlice";
import { Redirect } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

const index = () => {
  const { data: books, isLoading, error } = useGetBooksQuery();
  if (isLoading) return <Loading />;
  if (error) return <ThemedText>Error</ThemedText>;
  return <Redirect href="/(tabs)/home" />;
};

export default index;
