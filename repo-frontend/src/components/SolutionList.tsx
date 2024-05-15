import axios from "axios";
import { Params } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000/api";

//fetch all solutions under a chapter
// param = chapter id
export async function loader({ params }: { params: Params<string> }) {
  const solutions = await axios.get(
    `${BASE_URL}/solutions/?chapter_id=${params.chapterId}`
  );
  return solutions.data;
}

// fetch particular solution
// param = solution id
export async function solutionLoader({ params }: { params: Params<string> }) {
  const solutions = await axios.get(
    `${BASE_URL}/solutions/?solution_id=${params.solutionId}`
  );
  return solutions.data;
}
