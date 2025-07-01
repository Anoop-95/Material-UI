import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const BookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmark(state, action) {
      const exists = state.find(item => item.url === action.payload.url);
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeBookmark(state, action) {
        return state.filter(item => item.url !== action.payload);
    }
  }
});

export const { addBookmark, removeBookmark } = BookmarkSlice.actions;
export default BookmarkSlice.reducer;
