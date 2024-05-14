import { useParams, Link } from "react-router-dom";
import Solution from "../interface/SolutionInterface";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import Chapter from "../interface/ChapterInterface";
import ChapterBreadcrumb from "../components/ChapterBreadcrumb";

const BASE_URL = "http://127.0.0.1:8000/api";

function SolutionPage() {
  let { chapterId } = useParams();
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [chapter, setChapter] = useState<Chapter[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSolution = async () => {
      setLoading(true);
      try {
        const [solutionsResponse, chapterResponse] = await Promise.all([
          axios.get(`${BASE_URL}/solutions/?chapter_id=${chapterId}`),
          axios.get(`${BASE_URL}/chapters/?chapter_id=${chapterId}`),
        ]);

        setSolutions(solutionsResponse.data);
        setChapter(chapterResponse.data);
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
    console.log(`Errrooorrr!! ${error}`);
    return (
      <div className="bg-dark text-light">
        {" "}
        Something went wrong... Try again
      </div>
    );
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <NavBar />
      </nav>
      <div>
        {chapter.map((currentChapter) => (
          <nav
            id="title-bar"
            className="navbar bg-dark"
            key={currentChapter.id}
          >
            {currentChapter.title}
          </nav>
        ))}
      </div>
      <div className="container bg-dark">
        <nav id="bc-nav" aria-label="breadcrumb">
          <ol id="bc-ol" className="breadcrumb">
            <li id="bc-books" className="breadcrumb-item">
              <Link to={"/"}>Books</Link>
            </li>
            <div>
              {chapter.map((currentChapter) => (
                // <Link to={`/books/${currentChapter.book}`}>
                //   {" "}
                //   {currentChapter.book}
                // </Link>
                <ChapterBreadcrumb
                  chapter={currentChapter}
                  key={currentChapter.id}
                />
              ))}
            </div>
          </ol>
        </nav>
        <ul className="list-group bg-dark">
          {solutions.map((solution) => (
            <li
              className="list-group-item bg-dark text-light"
              key={solution.id}
            >
              {solution.exercise_number}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SolutionPage;
