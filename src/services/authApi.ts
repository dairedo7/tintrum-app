import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './API';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  endpoints: (builder) => ({
    signInUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: '/auth/signin',
          method: 'post',
          body,
        };
      },
    }),
    signUpUser: builder.mutation({
      query: (body: { firstName: string; secondName: string; email: string; password: string }) => {
        return {
          url: '/auth/signup',
          method: 'post',
          body,
        };
      },
    }),
  }),
});

export const { useSignInUserMutation, useSignUpUserMutation } = authApi;
