import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="navbar">
      <h1 className="navbar-title">Online Library</h1>

      <nav className="navbar-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/books"
          className={location.pathname === "/books" ? "active" : ""}
        >
          Browse Books
        </Link>

        <Link
          to="/add"
          className={location.pathname === "/add" ? "active" : ""}
        >
          Add Book
        </Link>
      </nav>
    </header>
  );
}


