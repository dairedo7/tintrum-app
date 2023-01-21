import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './API';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    credentials: 'same-origin',
    prepareHeaders: (headers, { getState }: any) => {
      const tokenData = getState().auth.token;
      const { token } = tokenData;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Plan', 'Done'],
  keepUnusedDataFor: 1,
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (credentials: { title: string; text: string }) => {
        return {
          url: '/tasks',
          method: 'post',
          mode: 'cors',
          body: { ...credentials },
        };
      },
      invalidatesTags: ['Plan'],
    }),
    removeTask: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `/tasks/${id}`,
          method: 'delete',
        };
      },
      invalidatesTags: ['Plan', 'Done'],
    }),
    getPlannedTasks: builder.query({
      query: () => '/tasks/get-status/plan',
      providesTags: ['Plan'],
    }),
    getDoneTasks: builder.query({
      query: () => '/tasks/get-status/done',
      providesTags: ['Done'],
    }),
  }),
});

export const { useAddTaskMutation, useGetDoneTasksQuery, useGetPlannedTasksQuery, useRemoveTaskMutation } = taskApi;
