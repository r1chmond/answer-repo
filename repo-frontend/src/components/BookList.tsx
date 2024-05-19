import React, { useEffect, useMemo, useState } from "react";
import Book from "../interface/BookInterface";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";

const BASE_URL = "http://127.0.0.1:8000/api";

type FetchError = Error | null;

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<FetchError>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/books`);
        setBooks(response.data);
        // setError(null);
      } catch (err) {
        if (err instanceof Error) {
          console.error(`Error occured while fetching books: ${err}`);
          setError(err);
        }
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
    return (
      <>
        <Loading />
      </>
    );
  }
  if (error) {
    return (
      <>
        <ErrorComponent message={error.message} />
      </>
    );
  }

  return (
    <>
      <div className="search-container">
        <div className="mb-3">
          <input
            className="form-control"
            id="textbook-search"
            name="textbook-search"
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
