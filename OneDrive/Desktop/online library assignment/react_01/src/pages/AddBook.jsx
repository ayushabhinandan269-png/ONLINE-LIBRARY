import { useDispatch } from "react-redux";
import { addBook } from "../redux/booksSlice";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addBook({
        id: Date.now(),
        title: e.target.title.value,
        author: e.target.author.value,
        category: e.target.category.value,
        description: e.target.description.value,
        rating: 5
      })
    );

    navigate("/books");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-3">
      <input name="title" required placeholder="Title" className="border p-2" />
      <input name="author" required placeholder="Author" className="border p-2" />
      <input name="category" required placeholder="Category" className="border p-2" />
      <textarea name="description" required placeholder="Description" className="border p-2" />
      <button className="bg-blue-600 text-white px-4 py-2">
        Add Book
      </button>
    </form>
  );
}
