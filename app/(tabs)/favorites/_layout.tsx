import { SortMenu } from "@/components/SortMenu";
import { router, Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
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
