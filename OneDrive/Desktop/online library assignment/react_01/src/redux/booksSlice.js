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
        "https://openlibrary.org/search.json?q=book"
      );

      // 👉 helper to assign categories deterministically
      const categories = [
        "Fiction",
        "Non-Fiction",
        "Sci-Fi",
        "Biography",
        "Technology"
      ];

      return response.data.docs.slice(0, 20).map((book, index) => ({
        id: book.key?.replace("/works/", "") || String(index),
        title: book.title,
        author: book.author_name?.[0] || "Unknown",
        category: categories[index % categories.length], // ✅ IMPORTANT
        description:
          book.first_sentence?.[0] ||
          "No description available for this book.",
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 ⭐
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
    status: "idle", // idle | loading | succeeded | failed
    error: null
  },
  reducers: {
    addBook: (state, action) => {
      state.books.unshift(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";

        // ❗ avoid duplicate fetch on navigation
        if (state.books.length === 0) {
          state.books = action.payload;
        }
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export const { addBook } = booksSlice.actions;
export default booksSlice.reducer;

