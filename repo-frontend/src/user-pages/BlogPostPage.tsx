import { useEffect, useState } from "react";
import BlogPost from "../interface/BlogPostInterface";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NavBar from "../components/NavBar";
import ScrollTopButton from "../components/ScrollTopButton";

const BASE_URL = "http://127.0.0.1:8000/api";

function BlogPostPage() {
  const param = useParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const navigate = useNavigate();

  const goBackToHomePage = () => {
    navigate("/", { state: { from: "blogpostPage" } });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const postResponse = await axios.get(
        `${BASE_URL}/blogposts/?post_id=${param.postId}`
      );
      setPosts(postResponse.data);
    };
    fetchPosts();
  }, []);
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
            </div>
            <img src={post.cover_image} />
            <ReactMarkdown
              children={post.content}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        ))}
      </div>
      <>
        <ScrollTopButton />
      </>
    </>
  );
}

export default BlogPostPage;
