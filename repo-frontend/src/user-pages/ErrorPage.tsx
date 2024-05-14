import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <>
      <div> 404 Page not found </div>
      <Link className="btn bg-dark text-light" to="/">
        Home
      </Link>
    </>
  );
}

export default ErrorPage;
