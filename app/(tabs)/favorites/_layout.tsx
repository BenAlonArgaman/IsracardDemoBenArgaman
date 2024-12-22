import { SortMenu } from "@/components/SortMenu";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { router, Stack } from "expo-router";

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
          title: "מועדפים",
          headerRight: () => <SortMenu />,
          headerSearchBarOptions: {
            placeholder: "חיפוש לפי שם ספר או תיאור",
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
