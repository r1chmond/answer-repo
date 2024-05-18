import React, { useEffect, useMemo, useState } from "react";
import Book from "../interface/BookInterface";
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/books`);
        setBooks(response.data);
      } catch (err: any) {
        setError(err);
        console.log(`Error occured when fetching books: ${err}`);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredBooks = useMemo(() => {
    return books.filter((book) =>
      book.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }, [books, searchQuery]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong... Try again</div>;
  }

  return (
    <>
      <div className="search-container">
        <div className="mb-3">
          <input
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div id="list-container" className="container bg-dark">
        <ul className="list-group bg-dark">
          {filteredBooks.map((book) => (
            <Link className="anchor-link" to={`books/${book.id}`} key={book.id}>
              <li
                id="book-list-row"
                className="list-group-item bg-dark text-light"
              >
                <span className="cell">{book.title}</span>
                <span id="book-edition-cell" className="cell">
                  Edition: {book.edition}
                </span>
                <span className="cell">Author(s): {book.author}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BookList;
