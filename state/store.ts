import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { booksApiSlice } from "./books/booksApiSlice";
import booksReducer from "./books/booksSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["favorites"],
};

const persistedBooksReducer = persistReducer(persistConfig, booksReducer);

export const store = configureStore({
  reducer: {
    [booksApiSlice.reducerPath]: booksApiSlice.reducer,
    books: persistedBooksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(booksApiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
