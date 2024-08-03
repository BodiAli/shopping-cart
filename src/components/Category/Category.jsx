import { useLoaderData } from "react-router-dom";
import getData from "../../utils/fetchData";
import styles from "./Category.module.css";

function Category() {
  const games = useLoaderData();

  return (
    <section className={styles.section}>
      {games.map((game) => {
        return (
          <div key={game.title} className={styles.card}>
            <div className={styles.imageContainer}>
              <div
                className={styles.backGround}
                style={{ backgroundImage: `url(${game.sample_cover.thumbnail_image})` }}
              ></div>
              <img src={game.sample_cover.thumbnail_image} alt={`${game.title} game poster`} />
            </div>
            <h3>{game.title}</h3>
          </div>
        );
      })}
    </section>
  );
}

async function loader({ params }) {
  if (params.category === "games") {
    const data = await getData("?");
    return data.games;
  }
  throw new Error("Data not found");
}

Category.loader = loader;

export default Category;
