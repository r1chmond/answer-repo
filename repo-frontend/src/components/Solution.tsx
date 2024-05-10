import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

function Solution() {
  const [solutions, setSolutions] = useState<DataType[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSolution = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/solutions`);
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
        {" "}
        Something went wrong... Try again
      </div>
    );
  }

  solutions.map((solution) => {
    console.log(
      `${solution.book}, ${solution.chapter_title}, ${solution.chapter_number}, ${solution.answer}`
    );
  });
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

export default Solution;
