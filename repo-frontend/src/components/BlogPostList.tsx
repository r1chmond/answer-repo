//TODO: add fetch errors and loading

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";
import useFetchBlogPosts from "../custom_hook/useFetchBlogPosts";

const BlogPostList = () => {
  const { posts, error, isLoading } = useFetchBlogPosts();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (error) {
    return (
      <>
        <ErrorComponent message={error.message} />
      </>
    );
  }

  return (
    <>
      <div className="search-container">
        <div className="mb-3">
          <input
            className="form-control"
            id="post-search"
            name="post-search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div id="blogpost-container" className="container bg-dark">
        {filteredPosts.map((post) => (
          <Link
            className="card grid-item"
            key={post.id}
            to={`blogposts/${post.id}`}
          >
            <img id="cover-img" src={post.cover_image} alt="cover image" />
            <div className="bp-cover-title-container">
              <p>{post.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default BlogPostList;
