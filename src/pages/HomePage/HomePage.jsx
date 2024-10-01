import { Link, useNavigate, useLoaderData } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import getData from "../../utils/fetchData";
import generatePrice from "../../utils/generatePrice";
import "@splidejs/react-splide/css/sea-green";
import styles from "./HomePage.module.css";

// Image
import noImage from "../../assets/no-image.svg";

function HomePage() {
  const data = useLoaderData();
  const navigate = useNavigate();

  function navigateToProduct(gameId) {
    navigate(`product/${gameId}`);
  }

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
      <Splide
        data-testid="carousel"
        tag="section"
        options={{
          type: "loop",
          drag: true,
          autoplay: true,
          interval: 5000,
        }}
        className={styles.carousel}
      >
        {data.map((item, index) => {
          const price = generatePrice();
          item.price = price;
          item.originalPrice = price;
          item.quantity = 1;

          return (
            <SplideSlide key={index}>
              <div
                data-testid="home-game-card"
                onClick={() => navigateToProduct(item.game_id)}
                className={styles.card}
              >
                <div className={styles.imageContainer}>
                  <div
                    className={styles.backGround}
                    style={{
                      backgroundImage: `url(${
                        item.sample_cover ? item.sample_cover.thumbnail_image : noImage
                      })`,
                    }}
                  ></div>
                  <img
                    src={item.sample_cover ? item.sample_cover.thumbnail_image : noImage}
                    alt={`${item.title} game poster`}
                  />
                </div>
                <div className={styles.descriptionContainer}>
                  <h3>{item.title}</h3>
                  <p className={styles.price}>{`Price: ${item.originalPrice}$`}</p>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></div>
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
      <section className={styles.shopContainer}>
        <Link to="shop/games" className={styles.shopNowLink}>
          Shop Now!
        </Link>
      </section>
    </main>
  );
}

async function loader() {
  const data = await getData("/random?limit=5&format=normal");
  if (!data) {
    throw new Error("Unable to fetch data");
  }
  if (!data.games || data.games.length === 0) {
    throw new Error("Data not found, try again later");
  }

  return data.games;
}

HomePage.loader = loader;
export default HomePage;
