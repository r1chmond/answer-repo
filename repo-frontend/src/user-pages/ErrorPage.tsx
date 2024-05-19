import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);
  return (
    <>
      <div className="error-page">
        <h1>Oops! &#128169;</h1>
        <p> Sorry, an unexpected error has occured. </p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link className="btn error-page-btn" to="/">
          Home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
