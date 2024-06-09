import { Link } from "react-router-dom";
import ErrorComponent from "../../components/ErrorComponent";
import Loading from "../../components/LoadingComponent";
import useFetchBlogPosts from "../../custom_hook/useFetchBlogPosts";
import AdminNavBar from "./AdminNavBar";

const AdminBlogPostList = () => {
  const { posts, error, isLoading } = useFetchBlogPosts();

  // search goes here ==================

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
      <ul className="list-group bg-dark">
        {posts.map((post) => (
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
