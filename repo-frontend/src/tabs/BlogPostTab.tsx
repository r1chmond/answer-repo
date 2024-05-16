import SearchBar from "../components/SearchBar";
import BlogPostList from "../components/BlogPostList";

function BlogPostTab() {
  return (
    <>
      <div className="search-container">
        <SearchBar />
      </div>
      <div id="blogpost-container" className="container bg-dark">
        <BlogPostList />
      </div>
    </>
  );
}

export default BlogPostTab;
