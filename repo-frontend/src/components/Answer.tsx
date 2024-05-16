import { useLoaderData } from "react-router-dom";
import Solution from "../interface/SolutionInterface";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Answer() {
  const solutions = useLoaderData() as Solution[];

  return (
    <>
      <div id="answer-main-container">
        {solutions.map((solution) => (
          <div id="answer-container" key={solution.id}>
            <h4>{solution.exercise_number}</h4>
            <ReactMarkdown
              className="markdown"
              children={solution.answer}
              remarkPlugins={[remarkGfm]}
            />
            <div id="answer-img-container">
              {solution.image ? (
                <img
                  id="answer-img"
                  src={`${solution.image}`}
                  alt="Answer image"
                />
              ) : (
                <span>======</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Answer;
