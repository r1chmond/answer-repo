import { useEffect, useState } from 'react';
import axios from 'axios';


const BASE_URL = "http://127.0.0.1:8000/api";


function Solution(){
  const [solutions, setSolutions] = useState<DataType[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSolution = async () => {
      setLoading(true);
      try{
        const response = await axios.get(`${BASE_URL}/solutions`);
        setSolutions(response.data);
        } catch (error) {
          setError(error);
          console.log(`Error when fetching solutions ${error}`)
        } finally {
            setLoading(false);
        }
        };
        fetchSolution();
  },[]);
   
    if (loading) {
    return <div> loading ... </div>;
  }

  solutions.map(solution => {
    console.log(`${solution.book}, ${solution.chapter_title}, ${solution.chapter_number}, ${solution.answer}`);
  })
  return (
    <ul className="list-group">
      {solutions.map((solution) => (
        <li className="list-group-item" key={solution.chapter_number}>
          {solution.chapter_title}
        </li>
    ))}
  </ul>
  );
}

export default Solution;
