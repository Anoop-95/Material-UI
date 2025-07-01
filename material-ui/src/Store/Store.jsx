import { configureStore } from '@reduxjs/toolkit';
import BookmarkReducer from './BookmarkSlice';

const store = configureStore({
  reducer: {
    bookmark: BookmarkReducer,
  },
});

export default store;
