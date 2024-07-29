import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h1>Error Occured</h1>
      <p>{error.statusText}</p>
      <p>{error.message}</p>
      <Link to="/">Head Back!</Link>
    </>
  );
}

export default ErrorPage;
