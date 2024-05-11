import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Solution from "./components/Solution";
import "./App.css";
import Book from "./components/Book";

function App() {
  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <div className="search-container">
        <SearchBar />
      </div>
      <div id="list-container" className="container bg-dark">
        <Book />
      </div>
      <div className="footer">copyright</div>
    </>
  );
}

export default App;
