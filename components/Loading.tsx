import { ActivityIndicator } from "react-native";
import { ThemedView } from "./ThemedView";

const Loading = () => {
  return (
    <ThemedView className="flex-1 items-center justify-center">
      <ActivityIndicator />
    </ThemedView>
  );
};

export default Loading;
