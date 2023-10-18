import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartSlice";
import darkModeReducer from "./darkModeSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const darkModePersistConfig = {
  key: "darkMode",
  storage,
};

const persistedDarkModeReducer = persistReducer(
  darkModePersistConfig,
  darkModeReducer
);

const store = configureStore({
  reducer: {
    cart: persistedReducer,
    darkMode: persistedDarkModeReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST"],
    },
  }),
});

export const persistor = persistStore(store);

export default store;
