import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="home-content">

        {/* HERO */}
        <h1>Welcome to Online Library</h1>
        <p>
          Browse, search, and add your favorite books from our collection
        </p>

        {/* BUTTONS */}
        <div className="home-buttons">
          <Link to="/books" className="primary-btn">
            Browse Books
          </Link>

          <Link to="/add" className="secondary-btn">
            Add Book
          </Link>
        </div>

        {/* CATEGORIES */}
        <section className="categories">
          <h2>Book Categories</h2>

          <div className="category-list">
            <Link to="/books/Fiction" className="category-chip">Fiction</Link>
            <Link to="/books/Non-Fiction" className="category-chip">Non-Fiction</Link>
            <Link to="/books/Sci-Fi" className="category-chip">Sci-Fi</Link>
            <Link to="/books/Biography" className="category-chip">Biography</Link>
            <Link to="/books/Technology" className="category-chip">Technology</Link>
          </div>
        </section>

        {/* POPULAR BOOKS */}
        <section className="popular-books">
          <h2>Popular Books</h2>

          <div className="book-grid">
            <div className="book-card">
              <h3>The Alchemist</h3>
              <p>Paulo Coelho</p>
              <Link to="/book/1">View Details</Link>
            </div>

            <div className="book-card">
              <h3>Clean Code</h3>
              <p>Robert C. Martin</p>
              <Link to="/book/2">View Details</Link>
            </div>

            <div className="book-card">
              <h3>Dune</h3>
              <p>Frank Herbert</p>
              <Link to="/book/3">View Details</Link>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <div className="features">
          <div className="feature-card">
            <h3>📚 Explore Books</h3>
            <p>Discover books across multiple categories.</p>
          </div>

          <div className="feature-card">
            <h3>➕ Add New Books</h3>
            <p>Easily add new books using a simple form.</p>
          </div>

          <div className="feature-card">
            <h3>🔍 View Details</h3>
            <p>View detailed information and images for each book.</p>
          </div>
        </div>

      </div>
    </div>
  );
}







