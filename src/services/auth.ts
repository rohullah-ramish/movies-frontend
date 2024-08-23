import { isHydrateAction } from "@/store/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  refresh_token:string,
  success:boolean,
  message:string
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://ec2-3-26-202-152.ap-southeast-2.compute.amazonaws.com/api/'
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
        url: 'users/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }):Promise<any> {
        try {
          return await queryFulfilled;
          
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
  }),
});

// Export hooks for the endpoints
export const { useLoginUserMutation } = api;
export const { loginUser } = api.endpoints;
