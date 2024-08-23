import { isHydrateAction } from "@/store/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Movie = {
  _id:string,
  title: string;
  publish_year: string;
  Type: string;
  poster: string;
};

type GetByNameResponse = {
  Search: Movie[];
  totalResults: number;
};

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/',
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the state (or wherever you store it)
      // const token = (getState() as RootState).auth.token;
      const token = localStorage.getItem("token");

      // If we have a token, set it in the headers
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getMoviesByName: builder.query<any, number>({
      query: (page = 1) => `movies?page=${page}`,
    }),
  }),
});

export const { useGetMoviesByNameQuery } = movieApi;

export const { getMoviesByName } = movieApi.endpoints;
