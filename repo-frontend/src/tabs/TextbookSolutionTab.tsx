import SearchBar from "../components/SearchBar";
import Book from "../components/Book";
import NavBar from "../components/NavBar";

function TextbookSolutionTab() {
  return (
    <>
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

export default TextbookSolutionTab;
