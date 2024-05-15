import { useParams } from "react-router-dom";

function Answer() {
  const param = useParams<{ solutionId: string }>();

  return <h1> Answer {param.solutionId} </h1>;
}

export default Answer;
