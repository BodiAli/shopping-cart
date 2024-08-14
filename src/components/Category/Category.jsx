import { Suspense } from "react";
import { Await, defer, useLoaderData, useOutletContext, useNavigate } from "react-router-dom";
import getData from "../../utils/fetchData";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import generatePrice from "../../utils/generatePrice";
import styles from "./Category.module.css";

// Image
import noImage from "../../assets/no-image.svg";

// Icons
import { IoMdAdd, IoMdRemove } from "react-icons/io";

function Category() {
  const { data: games } = useLoaderData();
  const navigate = useNavigate();
  const { arr, handleButtonClick } = useOutletContext();
  const [cart] = arr;

  function navigateToProduct(gameId) {
    navigate(`/product/${gameId}`);
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={games}>
        {(games) => {
          if (!games || !games.games || games.games.length === 0) {
            throw new Error("Data not found, try again later");
          }

          return (
            <section className={styles.section}>
              {games.games.map((game) => {
                const price = generatePrice();
                game.price = price;
                game.originalPrice = price;
                game.quantity = 1;
                return (
                  <div
                    onClick={() => navigateToProduct(game.game_id)}
                    key={game.title}
                    className={styles.card}
                  >
                    <div className={styles.imageContainer}>
                      <div
                        className={styles.backGround}
                        style={{
                          backgroundImage: `url(${
                            game.sample_cover ? game.sample_cover.thumbnail_image : noImage
                          })`,
                        }}
                      ></div>
                      <img
                        src={game.sample_cover ? game.sample_cover.thumbnail_image : noImage}
                        alt={`${game.title} game poster`}
                      />
                    </div>
                    <div className={styles.textContainer}>
                      <h3>{game.title}</h3>
                      <div>
                        <p>{`Price: ${game.originalPrice}$`}</p>
                        <button onClick={(e) => handleButtonClick(e, game)}>
                          {cart.isTheProductPresent(game) ? (
                            <>
                              <IoMdRemove color="#c00000" /> Remove from Cart
                            </>
                          ) : (
                            <>
                              <IoMdAdd color="#01f5b8" /> Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
