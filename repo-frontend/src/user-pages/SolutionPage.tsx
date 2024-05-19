import { useParams, Link, Outlet, useLoaderData } from "react-router-dom";
import Solution from "../interface/SolutionInterface";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import Chapter from "../interface/ChapterInterface";
import ChapterBreadcrumb from "../components/ChapterBreadcrumb";
import SideBar from "../components/SideBar";
import ScrollTopButton from "../components/ScrollTopButton";
import Loading from "../components/LoadingComponent";

const BASE_URL = "http://127.0.0.1:8000/api";
const STATUS_OK = 200;

function SolutionPage() {
  let { chapterId } = useParams();
  const [chapter, setChapter] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const solutions = useLoaderData() as Solution[];

  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);
      try {
        const chapterResponse = await axios.get(
          `${BASE_URL}/chapters/?chapter_id=${chapterId}`
        );
        if (chapterResponse.status !== STATUS_OK) {
          throw new Error("Network error");
        } else {
          setChapter(chapterResponse.data);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChapter();
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
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

  //If outlet div has child element, remove prompt(select solution)
  const solutionDetail = document.getElementById("detail");
  const solutionPrompt = document.getElementById("prompt");
  if (
    solutionDetail &&
    solutionPrompt &&
    solutionDetail.childElementCount > 0
  ) {
    solutionPrompt.innerText = "";
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
              <Link className="inactive-anchor-link" to={"/"}>
                Books
              </Link>{" "}
              <span className="greater-than">&#x02AA2;</span>
            </li>

            {chapter.map((currentChapter) => (
              <ChapterBreadcrumb
                chapter={currentChapter}
                key={currentChapter.id}
              />
            ))}
          </ol>
        </nav>
        <>
          <SideBar solutions={solutions} />
        </>
        <div id="detail">
          <Outlet />
        </div>
        <div id="prompt">Select a solution</div>
      </div>
      <>
        <ScrollTopButton />
      </>
    </>
  );
}

export default SolutionPage;
