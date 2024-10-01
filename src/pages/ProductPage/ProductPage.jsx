import { useEffect } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import getData from "../../utils/fetchData";
import generatePrice from "../../utils/generatePrice";
import "@splidejs/react-splide/css/sea-green";
import styles from "./ProductPage.module.css";

// Image
import noImage from "../../assets/no-image.svg";

// Icons
import { IoMdAdd, IoMdRemove, IoMdArrowRoundBack } from "react-icons/io";

function ProductPage() {
  const navigate = useNavigate();
  const game = useLoaderData();
  const { arr, handleButtonClick } = useOutletContext();
  const [cart] = arr;

  useEffect(() => {
    document.title = `${game.title} | GameVault`;

    return () => {
      document.title = "GameVault";
    };
  }, [game.title]);

  const price = generatePrice();
  game.price = price;
  game.originalPrice = price;
  game.quantity = 1;

  function handleBackButton() {
    navigate(-1);
  }
  return (
    <main className={styles.main}>
      <button onClick={handleBackButton} className={styles.backButton}>
        <IoMdArrowRoundBack /> Back
      </button>
      <p className={styles.screenshotsP}>Game Screenshots</p>
      <Splide
        data-testid="carousel"
        tag="section"
        options={{
          type: "loop",
          drag: true,
          autoplay: true,
          interval: 5000,
          arrows: false,
        }}
        className={styles.carousel}
      >
        {game.sample_screenshots.length === 0 ? (
          <img className={styles.noImage} src={noImage} alt="no image" />
        ) : (
          game.sample_screenshots.map((screenshot, index) => {
            return (
              <SplideSlide key={index}>
                <div className={styles.screenshotsContainer}>
                  <img
                    className={styles.screenshot}
                    src={screenshot.thumbnail_image ? screenshot.thumbnail_image : noImage}
                    alt="game screenshot"
                  />
                </div>
              </SplideSlide>
            );
          })
        )}
      </Splide>

      <section className={styles.gameInfo}>
        <div className={styles.infoImgContainer}>
          <img
            src={game.sample_cover ? game.sample_cover.thumbnail_image : noImage}
            alt={`${game.title} game poster`}
          />
        </div>
        <div className={styles.container}>
          <div className={styles.titlesContainer}>
            <div className={styles.titleContainer}>
              <p>Title:</p>
              <h2 className={styles.title}>{game.title}</h2>
            </div>
            <div className={styles.alternateTitlesContainer}>
              <p>Alternate Titles:</p>
              <ul className={styles.alternateTitles}>
                {game.alternate_titles.length === 0 ? (
                  <li>No alternate titles</li>
                ) : (
                  game.alternate_titles.map((title, index) => {
                    return (
                      <div key={index}>
                        <li>{title.title}</li>
                        <ul>
                          <li>{title.description}</li>
                        </ul>
                      </div>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
          <div className={styles.genresContainer}>
            <p>Genres:</p>
            <ul className={styles.genres}>
              {game.genres.map((genre, index) => {
                return (
                  <div key={index}>
                    <li>{genre.genre_category}</li>
                    <ul>
                      <li>{genre.genre_name}</li>
                    </ul>
                  </div>
                );
              })}
            </ul>
          </div>
          <div className={styles.platformsContainer}>
            <p>Platforms:</p>
            <ul className={styles.platforms}>
              {game.platforms.map((platform, index) => {
                return (
                  <div key={index}>
                    <li>{platform.platform_name}</li>
                    <ul>
                      <li>Release date: {platform.first_release_date}</li>
                    </ul>
                  </div>
                );
              })}
            </ul>
          </div>

          <div className={styles.buttonContainer}>
            <p>
              Price: <span>{game.originalPrice}</span>
            </p>
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
        <div
          className={styles.descriptionContainer}
          dangerouslySetInnerHTML={{ __html: game.description }}
        ></div>
      </section>
    </main>
  );
}

async function loader({ params }) {
  try {
    const game = await getData(`?id=${params.id}`);
    if (!game.games || game.games.length === 0) {
      throw new Error("Data not found");
    }

    return game.games[0];
  } catch (error) {
    if (error.message === "Bad Request") {
      throw new Error("Data not found");
    } else {
      throw new Error(error);
    }
  }
}

ProductPage.loader = loader;

export default ProductPage;
