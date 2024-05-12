import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage";

const BASE_URL = "http://127.0.0.1:8000/api";

function BookPage() {
  let { bookId } = useParams();

  const [solutions, setSolutions] = useState<DataType[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSolution = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/solutions/?book_id=${bookId}`
        );
        setSolutions(response.data);
      } catch (err: any) {
        setError(err);
        console.log(`Error when fetching solutions ${err}`);
      } finally {
        setLoading(false);
      }
    };
    fetchSolution();
  }, []);

  if (loading) {
    return <div className="bg-dark text-light"> loading ... </div>;
  }

  if (error) {
    return (
      <div className="bg-dark text-light">
        <ErrorPage />
      </div>
    );
  }

  return (
    <ul className="list-group bg-dark">
      {solutions.map((solution) => (
        <li
          className="list-group-item bg-dark text-light"
          style={{ marginTop: 8 }}
          key={solution.chapter_number}
        >
          {solution.chapter_title}
        </li>
      ))}
    </ul>
  );
}

export default BookPage;
