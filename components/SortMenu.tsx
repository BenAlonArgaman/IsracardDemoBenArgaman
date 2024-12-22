import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import * as DropdownMenu from "zeego/dropdown-menu";

export const SORT_OPTIONS = {
  TITLE: "title",
  PAGES: "pages",
  DATE: "date",
} as const;

export function SortMenu() {
  // using Zeego DropdownMenu
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Pressable>
          <MaterialIcons
            name="sort"
            size={24}
            color={useColorScheme() === "dark" ? "white" : "black"}
          />
        </Pressable>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item
          key={SORT_OPTIONS.TITLE}
          onSelect={() => router.setParams({ sort: SORT_OPTIONS.TITLE })}
        >
          <DropdownMenu.ItemTitle>כותרת א-ת</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          key={SORT_OPTIONS.PAGES}
          onSelect={() => router.setParams({ sort: SORT_OPTIONS.PAGES })}
        >
          <DropdownMenu.ItemTitle>מספר עמודים</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          key={SORT_OPTIONS.DATE}
          onSelect={() => router.setParams({ sort: SORT_OPTIONS.DATE })}
        >
          <DropdownMenu.ItemTitle>תאריך הוצאה</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
