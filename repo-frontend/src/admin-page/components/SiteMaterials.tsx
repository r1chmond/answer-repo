import { Link } from "react-router-dom";

const SiteMaterials = () => {
  return (
    <>
      <div id="materials-container" className="d-flex justify-content-start">
        <Link id="materials-tb" to="" className="materials-card">
          Textbooks
        </Link>
        <Link
          id="materials-bp"
          to="/answer-repo/admin/site-materials/blogposts/"
          className="materials-card"
        >
          Blogposts
        </Link>
      </div>
    </>
  );
};

export default SiteMaterials;
