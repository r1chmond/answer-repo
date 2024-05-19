import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Book from "../interface/BookInterface";
import Chapter from "../interface/ChapterInterface";
import Loading from "../components/LoadingComponent";
import ErrorComponent from "../components/ErrorComponent";
import FetchError, { fetchErrorMessage } from "../interface/FetchError";
import ScrollTopButton from "../components/ScrollTopButton";

const BASE_URL = "http://127.0.0.1:8000/api";

const ChapterPage = () => {
  let { bookId } = useParams();

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [book, setBook] = useState<Book[]>([]);
  const [error, setError] = useState<FetchError>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [solutionResponse, bookResponse] = await Promise.all([
          axios.get(`${BASE_URL}/chapters/?book_id=${bookId}`),
          axios.get(`${BASE_URL}/books/?book_id=${bookId}`),
        ]);
        setChapters(solutionResponse.data);
        setBook(bookResponse.data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(
            `${fetchErrorMessage(
              bookId,
              "chapters of book"
            )} OR book ${bookId}: ${err}`
          );
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookId]);

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
      <nav className="navbar navbar-dark bg-dark">
        <NavBar />
      </nav>
      <div>
        {book.map((currentBook) => (
          <nav id="title-bar" className="navbar bg-dark" key={currentBook.id}>
            {currentBook.title}
          </nav>
        ))}
      </div>
      <div className="container bg-dark">
        <nav id="bc-nav" aria-label="breadcrumb">
          <ol id="bc-ol" className="breadcrumb">
            <li className="breadcrumb-item">
              <Link className="inactive-anchor-link" to={"/"}>
                Books
              </Link>{" "}
              <span className="greater-than">&#x02AA2;</span>
            </li>
            {book.map((currentBook) => (
              <li
                id="bc-active"
                className="breadcrumb-item active"
                key={currentBook.id}
              >
                {currentBook.title}
              </li>
            ))}
          </ol>
        </nav>
        <ul className="list-group bg-dark">
          {chapters.map((chapter) => (
            <Link
              className="anchor-link"
              to={`chapters/${chapter.id}`}
              key={chapter.id}
            >
              <li
                id="book-list-row"
                className="list-group-item bg-dark text-light"
              >
                ({chapter.number}) {chapter.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <ScrollTopButton />
    </>
  );
};

export default ChapterPage;
