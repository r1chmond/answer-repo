import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

interface Book {
  id: number;
  title: string;
  author: string;
  edition: number;
  isbn: string;
}

function Book() {
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
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong... Try again</div>;
  }

  return (
    <ul className="list-group bg-dark">
      {books.map((book) => (
        <Link className="anchor-link" to={`books/${book.id}`} key={book.id}>
          <li
            id="book-list-row"
            className="list-group-item bg-dark text-light"
            style={{ marginTop: 8 }}
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
  );
}

export default Book;
