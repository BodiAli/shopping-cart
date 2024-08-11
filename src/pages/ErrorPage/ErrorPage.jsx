import { useEffect } from "react";
import { Link, useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css";

function ErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    document.title = "Error";

    return () => {
      document.title = "GameVault";
    };
  });

  return (
    <div className={styles.container}>
      <h1>Looks like you are lost!</h1>
      {error.data && <p>{error.data}</p>}
      <p>{error.statusText || error.message}</p>
      <Link to="/">Head Back!</Link>
    </div>
  );
}

export default ErrorPage;
