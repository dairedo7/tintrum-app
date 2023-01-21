import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../app/store';

export interface ListState {
  title: string | null;
  text: string | null;
  createdAt: string | null;
  _id: string | null;
}

const initialState: ListState = {
  title: null,
  text: null,
  createdAt: null,
  _id: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasksList: (state, action: PayloadAction<{ title: string; text: string; createdAt: string; _id: string }>) => {
      const { payload } = action;
      localStorage.setItem(
        'list',
        JSON.stringify({
          title: payload.title,
          text: payload.text,
          createdAt: payload.createdAt,
          _id: payload._id,
        })
      );

      state.title = payload.title;
      state.text = payload.text;
      state.createdAt = payload.createdAt;
      state._id = payload._id;
    },
  },
});

export const selectTask = (state: RootState) => state.task;

export const { setTasksList } = taskSlice.actions;

export default taskSlice.reducer;
