import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";

function TextbookSolutionTab() {
  return (
    <>
      <div className="search-container">
        <SearchBar />
      </div>
      <div id="list-container" className="container bg-dark">
        <BookList />
      </div>
      <div className="footer">copyright</div>
    </>
  );
}

export default TextbookSolutionTab;
