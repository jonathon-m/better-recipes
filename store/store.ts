import { configureStore } from '@reduxjs/toolkit';
import { recipeApi } from '../middleware/recipeAPI';
import ToastMiddleware from '../middleware/toasts';
import progressSlice from './features/progress/progressSlice';

export const store = configureStore({
  reducer: {
    progress: progressSlice,
    [recipeApi.reducerPath]: recipeApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([recipeApi.middleware, ToastMiddleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
