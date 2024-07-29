import styles from "./HomePage.module.css";
import getData from "../../utils/fetchData";
import { useLoaderData } from "react-router-dom";

function HomePage() {
  // const data = useLoaderData();

  return (
    <main className={styles.main}>
      <div className={styles.descriptionContainer}>
        <h2>Welcome to GameVault, Your Ultimate Video Game Destination</h2>
        <p>
          Discover a vast selection of video games across all genres and platforms. Whether you&apos;re a
          casual gamer or a hardcore enthusiast, we have everything you need to elevate your gaming experience
        </p>
      </div>
      <div className={styles.carousel}>
        <div className={styles.card}></div>
        <div className={styles.pagination}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
      </div>
    </main>
  );
}

async function loader() {
  const data = await getData("/random?limitt=5&");
  return data;
}

export { loader };
export default HomePage;
