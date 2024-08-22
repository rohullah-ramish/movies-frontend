import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isHydrateAction } from "../store/utils";

export type Pokemon = {
  id: number;
  name: string;
};

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

export const {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
  util: { getRunningQueriesThunk },
} = pokemonApi;

export const { getPokemonByName, getPokemonList } = pokemonApi.endpoints;
