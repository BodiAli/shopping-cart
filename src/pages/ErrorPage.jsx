import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <>
      <h1>Error Occured</h1>
      <Link to="/">Head Back!</Link>
    </>
  );
}

export default ErrorPage;
