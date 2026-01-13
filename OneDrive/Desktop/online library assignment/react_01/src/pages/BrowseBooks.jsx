import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/booksSlice";
import { Link, useParams } from "react-router-dom";

/* Helper to get book cover image */
const getCoverImage = (coverId) =>
  coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "https://via.placeholder.com/150x220?text=No+Image";

export default function BrowseBooks() {
  const dispatch = useDispatch();
  const { category } = useParams(); // dynamic category
  const { books, status, error } = useSelector((state) => state.books);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  /* CATEGORY FILTER */
  const categoryFilteredBooks = category
    ? books.filter(
        (book) =>
          book.category &&
          book.category.toLowerCase() === category.toLowerCase()
      )
    : books;

  /* SEARCH FILTER */
  const filteredBooks = categoryFilteredBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  if (status === "loading") {
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading books...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center mt-20 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 space-y-14">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold">
            {category ? `${category} Books` : "Browse Books"}
          </h1>
          <p className="text-gray-600 text-lg">
            Search and explore books from our collection
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search by title or author"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* CATEGORY LINKS */}
        <div className="flex justify-center gap-6 flex-wrap font-medium">
          {[
            "All",
            "Fiction",
            "Non-Fiction",
            "Sci-Fi",
            "Biography",
            "Technology",
          ].map((cat) => (
            <Link
              key={cat}
              to={cat === "All" ? "/books" : `/books/${cat}`}
              className={`px-4 py-2 rounded-full border transition ${
                category === cat ||
                (!category && cat === "All")
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 border-blue-600 hover:bg-blue-50"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* BOOK GRID */}
        {filteredBooks.length === 0 ? (
          <p className="text-center text-gray-600">
            No books found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 justify-center">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden w-[260px] transition transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <img
                  src={getCoverImage(book.coverId)}
                  alt={book.title}
                  className="h-60 w-full object-cover"
                />

                <div className="p-6 text-center space-y-2">
                  <h2 className="font-semibold text-lg">
                    {book.title}
                  </h2>

                  <p className="text-sm text-gray-600">
                    {book.author}
                  </p>

                  <Link
                    to={`/book/${book.id}`}
                    className="inline-block mt-3 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}


