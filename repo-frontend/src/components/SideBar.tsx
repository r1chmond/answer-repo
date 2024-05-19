import Solution from "../interface/SolutionInterface";
import { Link } from "react-router-dom";
import React, { useState } from "react";

interface SolutionProps {
  solutions: Solution[];
}

const SideBar: React.FC<SolutionProps> = ({ solutions }) => {
  const handleButtonClick = () => {
    const sidebar = document.getElementById("mySidebar") as HTMLElement;
    const main = document.getElementById("main") as HTMLElement;
    const openbtn = document.getElementById("open-close-btn") as HTMLElement;

    if (sidebar && main && sidebar.style.width === "0px") {
      sidebar.style.width = "250px";
      main.style.marginLeft = "250px";
      openbtn.innerText = "Close Solutions";
    } else {
      sidebar.style.width = "0px";
      main.style.marginLeft = "0px";
      openbtn.innerText = "Open Solutions";
    }
  };

  let [selectedIndex, setSelectedIndex] = useState(-1);

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
    const solutionPrompt = document.getElementById("prompt");
    if (solutionPrompt) {
      solutionPrompt.innerText = "";
    }
  };

  return (
    <>
      <div id="mySidebar" className="sidebar" style={{ width: "0px" }}>
        {solutions.map((solution, index) => (
          <Link
            className={selectedIndex === index ? "isActive" : ""}
            key={solution.id}
            to={`solutions/${solution.id}`}
            onClick={() => handleItemClick(index)}
          >
            {solution.exercise_type} {solution.exercise_number}
          </Link>
        ))}
      </div>
      <div id="main">
        <button
          id="open-close-btn"
          className="openbtn"
          onClick={handleButtonClick}
        >
          &#9776; Open Solutions
        </button>
      </div>
    </>
  );
};

export default SideBar;
