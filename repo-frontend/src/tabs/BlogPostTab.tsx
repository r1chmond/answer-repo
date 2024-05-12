import SearchBar from "../components/SearchBar";

function BlogPostTab() {
  return (
    <>
      <div className="search-container">
        <SearchBar />
      </div>
      <div className="container bg-dark">Pending</div>
    </>
  );
}

export default BlogPostTab;
