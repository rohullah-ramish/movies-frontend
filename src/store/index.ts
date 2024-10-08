import { configureStore } from "@reduxjs/toolkit";

import { pokemonApi } from "../services/pokemon";
import { createWrapper } from "next-redux-wrapper";
import { movieApi } from "@/services/movies";
import { authApi } from "@/services/auth";

export const makeStore = () =>
  configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [authApi.reducerPath]: authApi.reducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      [movieApi.reducerPath]: movieApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        pokemonApi.middleware,
        movieApi.middleware,
        authApi.middleware
      ),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
