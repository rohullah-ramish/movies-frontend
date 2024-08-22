import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isHydrateAction } from "./utils";

export type Pokemon = {
  id: number;
  name: string;
};

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonList: builder.query<Pokemon[], void>({ query: () => `pokemon/` }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
  util: { getRunningQueriesThunk },
} = pokemonApi;

export const { getPokemonByName, getPokemonList } = pokemonApi.endpoints;
