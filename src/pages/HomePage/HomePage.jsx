import { useLoaderData } from "react-router-dom";
import getData from "../../utils/fetchData";
import back from "../../assets/back.svg";
import forward from "../../assets/forward.svg";
import styles from "./HomePage.module.css";

function HomePage() {
  const data = useLoaderData();
  console.log(data);

  return (
    <main className={styles.main}>
      <div className={styles.headerContainer}>
        <h2>
          Welcome to GameVault
          <br />
          Your Ultimate Video Game Destination
        </h2>
        <p>
          Discover a vast selection of video games across all genres and platforms. Whether you&apos;re a
          casual gamer or a hardcore enthusiast, we have everything you need to elevate your gaming experience
        </p>
      </div>
      <div className={styles.carousel}>
        <button>
          <img src={back} alt="back" />
        </button>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <div
              className={styles.backGround}
              style={{ backgroundImage: `url(${data[0].sample_cover.thumbnail_image})` }}
            ></div>
            <img src={data[0].sample_cover.thumbnail_image} alt="" />
          </div>
          <div className={styles.descriptionContainer}>
            <h3>{data[0].title}</h3>
            <div dangerouslySetInnerHTML={{ __html: data[0].description }}></div>
          </div>
        </div>
        <button>
          <img src={forward} alt="forward" />
        </button>
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

HomePage.loader = loader;
export default HomePage;
