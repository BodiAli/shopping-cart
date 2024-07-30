import styles from "./HomePage.module.css";
import getData from "../../utils/fetchData";
import { useLoaderData } from "react-router-dom";

//TODO: return jsx from description

function HomePage() {
  const data = useLoaderData();
  console.log(data);
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
        <button>Back</button>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <div
              className={styles.backGround}
              style={{ backgroundImage: `url(${data[0].sample_cover.thumbnail_image})` }}
            ></div>
            <img src={data[0].sample_cover.thumbnail_image} alt="" />
          </div>
          <h3>{data[0].title}</h3>
          {data[0].description}
        </div>
        <button>Forward</button>
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
  const data = await getData("/random?limit=5&format=normal&");
  if (!data) {
    throw new Error("Unable to fetch data");
  }
  return data.games;
}

export { loader };
export default HomePage;
