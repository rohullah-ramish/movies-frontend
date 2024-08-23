import { isHydrateAction } from "@/store/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  refresh_token: string;
  success: boolean;
  message: string;
};

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    // Login user endpoint
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }): Promise<any> {
        try {
          return await queryFulfilled;
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
  }),
});

// Export hooks for the endpoints
export const { useLoginUserMutation } = authApi;
export const { loginUser } = authApi.endpoints;
