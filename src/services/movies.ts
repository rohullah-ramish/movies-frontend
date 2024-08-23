import { isHydrateAction } from "@/store/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PAGE_SIZE = 8;

export type Movie = {
  _id: string;
  title: string;
  publish_year: string;
  poster: string;
};

type GetMoviesListResponse = {
  message: string;
  total: number;
  limit: number;
  data: Movie[];
  success: boolean;
};

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
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
    getMoviesList: builder.query<GetMoviesListResponse, number>({
      query: (page = 1) => `movies?page=${page}&limit=${PAGE_SIZE}`,
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

export const { useGetMoviesListQuery } = movieApi;

export const { addMovies, getMoviesDetails, deleteMovies, updateMovies } =
  movieApi.endpoints;
