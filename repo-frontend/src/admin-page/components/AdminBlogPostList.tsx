import { Link, useNavigate } from "react-router-dom";
import ErrorComponent from "../../components/ErrorComponent";
import Loading from "../../components/LoadingComponent";
import useFetchBlogPosts from "../../custom_hook/useFetchBlogPosts";
import AdminNavBar from "./AdminNavBar";
import { useMemo, useState } from "react";

const AdminBlogPostList = () => {
  const { posts, error, isLoading } = useFetchBlogPosts();

  // breadcrumb navigation to go back to previous page
  const navigate = useNavigate();
  const handleBackToSiteMaterial = () => {
    navigate("/answer-repo/admin/dashboard/", { state: { from: "blogposts" } });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent message={error.message} />;
  }
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <AdminNavBar />
      </nav>
      <nav id="bc-nav" aria-label="breadcrumb">
        <ol id="bc-ol" className="breadcrumb">
          <li id="bc-books" className="breadcrumb-item">
            <button
              className="inactive-anchor-link"
              onClick={handleBackToSiteMaterial}
            >
              Site Materials
            </button>{" "}
            <span className="greater-than">&#x02AA2;</span>
          </li>
          <li id="bc-active" className="breadcrumb-item active">
            Blogposts
          </li>
        </ol>
      </nav>
      <div className="search-add-container">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Blogposts"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <button className="btn error-page-btn">&#43; Add Blogpost</button>
      </div>
      <ul className="list-group bg-dark">
        {filteredPosts.map((post) => (
          <Link className="anchor-link" to={``} key={post.id}>
            <li
              id="book-list-row"
              className="list-group-item bg-dark text-light"
            >
              <span className="cell">{post.title}</span>
              <span id="book-edition-cell" className="cell">
                Category: {post.category}
              </span>
              <span className="cell">Author: {post.author}</span>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default AdminBlogPostList;
