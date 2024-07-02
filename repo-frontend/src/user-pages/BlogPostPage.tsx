import { useEffect, useState } from "react";
import BlogPost from "../interface/BlogPostInterface";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NavBar from "../components/NavBar";
import ScrollTopButton from "../components/ScrollTopButton";
import FetchError, { fetchErrorMessage } from "../interface/FetchError";
import Loading from "../components/LoadingComponent";
import ErrorComponent from "../components/ErrorComponent";

const BASE_URL = "http://127.0.0.1:8000/api";

const BlogPostPage = () => {
  const param = useParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<FetchError>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  //update the history stack
  const goBackToHomePage = () => {
    navigate("/", { state: { from: "blogpostPage" } });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const postResponse = await axios.get(
          `${BASE_URL}/blogposts/?post_id=${param.postId}`
        );
        setPosts(postResponse.data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(
            `${fetchErrorMessage(param.postId, "blogpost")}: ${err}`
          );
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <Loading />;

  if (error) return <ErrorComponent message={error.message} />;

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <NavBar />
      </nav>
      <div className="container bg-dark">
        <button
          id="button-link"
          className="inactive-anchor-link"
          onClick={goBackToHomePage}
        >
          Back to blog posts
        </button>
        {posts.map((post) => (
          <div id="bp-detail-container" key={post.id}>
            <h3>{post.title}</h3>
            <div>
              <div>{post.date_posted}</div>
              <div>{post.author}</div>
              <div>
                <span>{post.social_platform}</span>
                <span>{post.social_username}</span>
              </div>
            </div>
            <img src={post.cover_image ? `${post.cover_image}` : ""} />

            <ReactMarkdown
              children={post.content}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        ))}
        <ScrollTopButton />
      </div>
    </>
  );
};

export default BlogPostPage;
