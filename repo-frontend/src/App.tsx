import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Solution from "./components/Solution";
import "./App.css";

function App() {
  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <div className="search-container">
        <SearchBar />
      </div>
      <div className="container bg-dark">
        <Solution />
      </div>
    </>
  );
}

export default App;
