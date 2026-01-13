import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

/* Helper to get book image */
const getCoverImage = (coverId) =>
  coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "https://via.placeholder.com/200x300?text=No+Image";

/* 🔹 Popular Books fallback (Home page cards) */
const popularBooks = [
  {
    id: "1",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    rating: 4.5,
    description:
      "A philosophical novel about a shepherd who dreams of discovering his destiny.",
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    rating: 4.8,
    description:
      "A handbook of agile software craftsmanship and clean coding principles.",
  },
  {
    id: "3",
    title: "Dune",
    author: "Frank Herbert",
    category: "Sci-Fi",
    rating: 4.6,
    description:
      "A science fiction epic set in a distant future amid interstellar politics.",
  },
];

export default function BookDetails() {
  const { id } = useParams();

  // ✅ Redux books (API + added books)
  const reduxBooks = useSelector((state) => state.books.books);

  // 🔎 Find book in Redux first
  let book = reduxBooks.find((b) => String(b.id) === String(id));

  // 🔁 Fallback to popular books
  if (!book) {
    book = popularBooks.find((b) => String(b.id) === String(id));
  }

  
  if (!book) {
    return (
      <div className="text-center mt-24 text-xl text-gray-600">
        Book not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md flex flex-col md:flex-row gap-8">
        
        {/* 📘 Book Image */}
        <img
          src={getCoverImage(book.coverId)}
          alt={book.title}
          className="w-64 h-96 object-cover rounded shadow"
        />

        {/* 📄 Book Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-3">
            {book.title}
          </h1>

          <p className="text-gray-700 mb-1">
            <strong>Author:</strong> {book.author}
          </p>

          <p className="text-gray-700 mb-1">
            <strong>Category:</strong> {book.category}
          </p>

          <p className="text-gray-700 mb-3">
            <strong>Rating:</strong> {book.rating} ⭐
          </p>

          <p className="text-gray-800 leading-relaxed">
            {book.description}
          </p>

          {/* Navigation */}
          <div className="mt-6 flex gap-6">
            <Link
              to="/books"
              className="text-blue-600 hover:underline"
            >
              ← Back to Browse
            </Link>

            <Link
              to={`/books/${book.category}`}
              className="text-blue-600 hover:underline"
            >
              View more {book.category} books →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}


