import { SortMenu } from "@/components/SortMenu";
import { router, Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        contentStyle: {
          backgroundColor:
            useColorScheme() === "dark"
              ? Colors.dark.background
              : Colors.light.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "דף הבית",
          headerRight: () => <SortMenu />,
          headerSearchBarOptions: {
            placeholder: "חיפוש לפי שם ספר",
            onChangeText: (event) => {
              // Update the search query parameter
              router.setParams({ q: event.nativeEvent.text });
            },
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
