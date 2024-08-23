import { isHydrateAction } from "@/store/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Movie = {
  _id: string;
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
    baseUrl: "http://ec2-3-26-202-152.ap-southeast-2.compute.amazonaws.com/api/",
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the state (or wherever you store it)
      // const token = (getState() as RootState).auth.token;
      const token = localStorage.getItem("token");

      // If we have a token, set it in the headers
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
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
    addMovies: builder.query<any, number>({
      query: (body) => ({
        url: "movies",
        method: "POST",
        body: body,
      }),
    }),
    updateMovies: builder.query<any, any>({
      query: ({ id, body }) => ({
        url: `movies/${id}`,
        method: "PATCH",
        body: body,
      }),
    }),
    deleteMovies: builder.query<any, any>({
      query: (id) => ({
        url: `movies/${id}`,
        method: "DELETE",
      }),
    }),
    getMoviesDetails: builder.query<any, any>({
      query: (id) => ({
        url: `movies/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMoviesByNameQuery } = movieApi;

export const { getMoviesByName, addMovies ,getMoviesDetails,deleteMovies,updateMovies} = movieApi.endpoints;
