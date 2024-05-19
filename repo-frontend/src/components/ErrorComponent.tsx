import React from "react";
interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="error-page" id="error-component">
        <h1>Oops! &#128169;</h1>
        <p> Sorry, an unexpected error has occured. </p>
        <p>
          <i>{message}</i>
        </p>
        <button className="btn bg-dark text-light" onClick={handleReload}>
          Retry
        </button>
      </div>
    </>
  );
};

export default ErrorComponent;
