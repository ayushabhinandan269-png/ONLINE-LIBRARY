import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ===============================
   API CALL 
================================ */
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://openlibrary.org/search.json?q=programming"
      );

      return response.data.docs.slice(0, 12).map((book, index) => ({
        id: book.key || index,
        title: book.title,
        author: book.author_name?.[0] || "Unknown",
        category: "Programming",
        description: "Fetched from Open Library API",
        rating: 4,
        coverId: book.cover_i || null   
      }));
    } catch (error) {
      return rejectWithValue("Failed to fetch books");
    }
  }
);

/* ===============================
   REDUX SLICE
================================ */
const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",      // idle | loading | succeeded | failed
    error: null
  },
  reducers: {
    addBook: (state, action) => {
      state.books.unshift(action.payload); // NEW BOOK FIRST
    }
  },
  extraReducers: (builder) => {
    builder
      // loading
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      //  success
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books.push(...action.payload);
      })
      //  error
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export const { addBook } = booksSlice.actions;
export default booksSlice.reducer;

