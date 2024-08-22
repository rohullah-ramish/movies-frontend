// import { isHydrateAction } from "@/store/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Movie = {
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
};

type GetByNameResponse = {
  Search: Movie[];
};

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_MOVIES_API}&s=Batman`,
  }),
  //   extractRehydrationInfo: (action, { reducerPath }) => {
  //     if (isHydrateAction(action)) {
  //       return action.payload[reducerPath];
  //     }
  //   },
  endpoints: (builder) => ({
    getMoviesByName: builder.query<GetByNameResponse, void>({
      query: () => `/`,
    }),
  }),
});

export const { useGetMoviesByNameQuery } = movieApi;

// export const { getMoviesByName } = movieApi.endpoints;
