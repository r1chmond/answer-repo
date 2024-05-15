import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);
  return (
    <>
      <div id="error-page">
        <h1>Oops! &#128169;</h1>
        <p> Sorry, an unexpected error has occured. </p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link className="btn bg-dark text-light" to="/">
          Home
        </Link>
      </div>
    </>
  );
}

export default ErrorPage;
