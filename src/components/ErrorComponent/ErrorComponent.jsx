import { useRouteError } from "react-router-dom";
import styles from "./ErrorComponent.module.css";

function ErrorComponent() {
  const error = useRouteError();

  function handleClick() {
    window.location.reload();
  }

  return (
    <section className={styles.section}>
      <h2>Unexpected error occurred!</h2>
      {error.data && <p>{error.data}</p>}
      <p>{error.statusText || error.message}</p>
      <button onClick={handleClick}>Retry</button>
    </section>
  );
}
export default ErrorComponent;
