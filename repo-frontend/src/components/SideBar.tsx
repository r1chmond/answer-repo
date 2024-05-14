import Solution from "../interface/SolutionInterface";
import React from "react";

interface SolutionProps {
  solutions: Solution[];
}
const SideBar: React.FC<SolutionProps> = ({ solutions }) => {
  const handleClick = () => {
    const sidebar = document.getElementById("mySidebar") as HTMLElement;
    const main = document.getElementById("main") as HTMLElement;

    if (sidebar && main && sidebar.style.width === "0px") {
      sidebar.style.width = "250px";
      main.style.marginLeft = "250px";
    } else {
      sidebar.style.width = "0px";
      main.style.marginLeft = "0px";
    }
  };

  return (
    <>
      <div id="mySidebar" className="sidebar" style={{ width: "0px" }}>
        {solutions.map((solution) => (
          <a key={solution.id} href="#">
            Exercise {solution.exercise_number}
          </a>
        ))}
      </div>
      <div id="main">
        <button className="openbtn" onClick={handleClick}>
          &#9776; Open Solutions
        </button>
      </div>
    </>
  );
};

export default SideBar;
