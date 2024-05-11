import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Book from "../components/Book";

function Homepage() {
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

export default Homepage;
