//TODO: add fetch errors and loading

import { useEffect, useMemo, useState } from "react";
import BlogPost from "../interface/BlogPostInterface";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";

const BASE_URL = "http://127.0.0.1:8000/api";

type FetchError = Error | null;

function BlogPostList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<FetchError>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const postResponse = await axios.get(`${BASE_URL}/blogposts`);
        setPosts(postResponse.data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(
            `Error occured while fetching blog posts: ${err.message}`
          );
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);
  if (loading) {
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
}

export default BlogPostList;
