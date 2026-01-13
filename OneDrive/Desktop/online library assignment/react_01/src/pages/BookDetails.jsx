import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

/* Helper to get book image */
const getCoverImage = (coverId) =>
  coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "https://via.placeholder.com/200x300?text=No+Image";

/* 🔹 Popular Books fallback (for Home page cards) */
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

  // 🔎 Try Redux first
  let book = reduxBooks.find((b) => String(b.id) === id);

  // 🔁 Fallback to popular books
  if (!book) {
    book = popularBooks.find((b) => b.id === id);
  }

  if (!book) {
    return (
      <div className="text-center mt-20 text-xl">
        Book not found
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      
      {/* 📘 Book Image */}
      <img
        src={getCoverImage(book.coverId)}
        alt={book.title}
        className="w-64 h-96 object-cover rounded shadow"
      />

      {/* 📄 Book Info */}
      <div>
        <h1 className="text-3xl font-bold mb-2">
          {book.title}
        </h1>

        <p className="text-gray-700 mb-1">
          <strong>Author:</strong> {book.author}
        </p>

        <p className="text-gray-700 mb-1">
          <strong>Category:</strong> {book.category}
        </p>

        <p className="text-gray-700 mb-1">
          <strong>Rating:</strong> {book.rating} ⭐
        </p>

        <p className="mt-4 text-gray-800">
          {book.description}
        </p>

        <Link
          to="/books"
          className="inline-block mt-6 text-blue-600 hover:underline"
        >
          ← Back to Browse
        </Link>
      </div>
    </div>
  );
}


