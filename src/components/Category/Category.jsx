import { Await, defer, useLoaderData } from "react-router-dom";
import getData from "../../utils/fetchData";
import styles from "./Category.module.css";
import { Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import generatePrice from "../../utils/generatePrice";

function Category() {
  const { data: games } = useLoaderData();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={games}>
        {(games) => {
          return (
            <section className={styles.section}>
              {games.games.map((game) => {
                game.price = generatePrice();
                return (
                  <div key={game.title} className={styles.card}>
                    <div className={styles.imageContainer}>
                      <div
                        className={styles.backGround}
                        style={{
                          backgroundImage: `url(${
                            game.sample_cover ? game.sample_cover.thumbnail_image : ""
                          })`,
                        }}
                      ></div>
                      <img
                        src={game.sample_cover ? game.sample_cover.thumbnail_image : ""}
                        alt={`${game.title} game poster`}
                      />
                    </div>
                    <div className={styles.textContainer}>
                      <h3>{game.title}</h3>
                      <div>
                        <p>{`Price: ${game.price}$`}</p>
                        <button>Add to cart</button>
                      </div>
                    </div>
                  </div>
                );
              })}
              ;
            </section>
          );
        }}
      </Await>
    </Suspense>
  );
}

async function loader({ params }) {
  if (params.category === "games") {
    return defer({ data: getData("?") });
  } else if (params.category === "windows") {
    return defer({ data: getData("?platform=3&") });
  } else if (params.category === "mac") {
    return defer({ data: getData("?platform=74&") });
  } else if (params.category === "linux") {
    return defer({ data: getData("?platform=1&") });
  } else if (params.category === "playstation") {
    return defer({ data: getData("?platform=6&") });
  } else if (params.category === "android") {
    return defer({ data: getData("?platform=91&") });
  } else if (params.category === "iphone") {
    return defer({ data: getData("?platform=86&") });
  } else if (params.category === "action") {
    return defer({ data: getData("?genre=1&") });
  } else if (params.category === "adventure") {
    return defer({ data: getData("?genre=2&") });
  } else if (params.category === "education") {
    return defer({ data: getData("?genre=12&") });
  } else if (params.category === "puzzle") {
    return defer({ data: getData("?genre=118&") });
  } else if (params.category === "arcade") {
    return defer({ data: getData("?genre=9&") });
  } else if (params.category === "racing") {
    return defer({ data: getData("?genre=6&") });
  } else if (params.category === "simulation") {
    return defer({ data: getData("?genre=3&") });
  } else if (params.category === "strategy") {
    return defer({ data: getData("?genre=4&") });
  }
  throw new Error("Data not found");
}

Category.loader = loader;

export default Category;
