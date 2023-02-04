import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { authApi } from '../services/authApi';
import { taskApi } from '../services/tasksApi';
import taskReducer from '../features/taskSlice';
import authReducer from '../features/authSlice';
// import authSlice from '../features/authSlice';

import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(authApi.middleware, taskApi.middleware),
];
// const rootReducer = combineReducers({
//   auth: authReducer,
//   [authApi.reducerPath]: authApi.reducer,
//   task: taskReducer,
//   [taskApi.reducerPath]: taskApi.reducer,
// });
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    task: taskReducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },

  middleware,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
