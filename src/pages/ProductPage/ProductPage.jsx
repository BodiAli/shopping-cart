import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import getData from "../../utils/fetchData";
import noImage from "../../assets/no-image.svg";
import "@splidejs/react-splide/css/sea-green";
import styles from "./ProductPage.module.css";

function ProductPage() {
  const game = useLoaderData();
  console.log(game);
  return (
    <main className={styles.main}>
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
              <p className={styles.title}>{game.title}</p>
            </div>
            <div className={styles.alternateTitlesContainer}>
              <p>Alternate Titles:</p>
              <ul className={styles.alternateTitles}>
                {game.alternate_titles.length === 0 ? (
                  <li>No alternate titles</li>
                ) : (
                  game.alternate_titles.map((title, index) => {
                    return (
                      <Fragment key={index}>
                        <li>{title.title}</li>
                        <ul>
                          <li>{title.description}</li>
                        </ul>
                      </Fragment>
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
                  <Fragment key={index}>
                    <li>{genre.genre_category}</li>
                    <ul>
                      <li>{genre.genre_name}</li>
                    </ul>
                  </Fragment>
                );
              })}
            </ul>
          </div>
          <div className={styles.platformsContainer}>
            <p>Platforms:</p>
            <ul className={styles.platforms}>
              {game.platforms.map((platform, index) => {
                return (
                  <Fragment key={index}>
                    <li>{platform.platform_name}</li>
                    <ul>
                      <li>Release date: {platform.first_release_date}</li>
                    </ul>
                  </Fragment>
                );
              })}
            </ul>
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
    const game = await getData(`?id=${params.id}&`);
    if (game) {
      return game.games[0];
    }
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

// {alternate_titles: Array(4), description: '<p>As an extension of one of the most long-running…dings as a direct result of actions you take.</p>', game_id: 1, genres: Array(6), moby_score: 7.1, …}
// alternate_titles
// :
// Array(4)
// 0
// :
// {description: 'Finnish title', title: 'Salaiset Kansiot'}
// 1
// :
// {description: 'PSX title', title: 'The X Files'}
// 2
// :
// {description: 'Spanish title', title: 'The X-Files: Expediente X - El Juego'}
// 3
// :
// {description: 'French title', title: 'The X-Files: Le Jeu'}
// length
// :
// 4
// [[Prototype]]
// :
// Array(0)
// description
// :
// "<p>As an extension of one of the most long-running television series of all time, <em>The X-Files</em>, play through the eyes of Special Agent Craig Willmore, a new FBI field investigator brought in to locate missing agents Fox Mulder and Dana Scully whose last location was the Everett, Washington, area. In this \"movie quality\" video production, characters are played by the actors and actresses from the show, including <a href=\"https://www.mobygames.com/person/9411/gillian-anderson/\">Gillian Anderson</a> (Scully) and <a href=\"https://www.mobygames.com/person/9412/david-duchovny/\">David Duchovny</a> (Mulder).</p>\n<p>As the game begins, you are given a briefing of your mission. Gather up all state-of-the-art spy tools (night vision goggles, a digital camera, PDA, lock picks, evidence kit, a standard issue revolver, handcuffs and badge) and then head out to follow their trail. As you explore the various locations, take photographs, pick up pieces of evidence and talk with people. Use your Newton PDA to access the navigational map, to make notes and send/receive e-mail. Trace telephone numbers, run background checks and license plate ids and even post an All Points Bulletin on missing persons using the computer network at your home or office. By using photo viewer software, download field photographs to the computer where they can be enlarged and studied more closely for clues.</p>\n<p>Features include emotion icons for interjecting different tones during conversations (mean, humorous or technical) which effect the answer given. An in-game hint system, Artificial Intelligence, can be set on or off. In addition, there are multiple endings as a direct result of actions you take.</p>"
// game_id
// :
// 1
// genres
// :
// (6) [{…}, {…}, {…}, {…}, {…}, {…}]
// moby_score
// :
// 7.1
// moby_url
// :
// "https://www.mobygames.com/game/1/the-x-files-game/"
// num_votes
// :
// 55
// official_url
// :
// null
// platforms
// :
// (3) [{…}, {…}, {…}]
// sample_cover
// :
// height
// :
// 800
// image
// :
// "https://cdn.mobygames.com/covers/4062982-the-x-files-game-windows-front-cover.jpg"
// platforms
// :
// (2) ['Windows', 'Macintosh']
// thumbnail_image
// :
// "https://cdn.mobygames.com/872aed6c-aba4-11ed-a188-02420a00019a.webp"
// width
// :
// 690
// [[Prototype]]
// :
// Object
// sample_screenshots
// :
// Array(5)
// 0
// :
// caption
// :
// "What you see of Mulder and Scully will mostly be in the intro until very late in the game when you actually get a chance to talk to them."
// height
// :
// 576
// image
// :
// "https://cdn.mobygames.com/screenshots/10470745-the-x-files-game-playstation-what-you-see-of-mulder-and-scully-w.jpg"
// thumbnail_image
// :
// "https://cdn.mobygames.com/6d9e6b00-ac10-11ed-803a-02420a000131.webp"
// width
// :
// 720
// [[Prototype]]
// :
// Object
// 1
// :
// {caption: 'Outside FBI Field Office', height: 480, image: 'https://cdn.mobygames.com/screenshots/11075560-the-x-files-game-windows-outside-fbi-field-office.jpg', thumbnail_image: 'https://cdn.mobygames.com/991435f8-ac15-11ed-81c5-02420a00012f.webp', width: 640}
// 2
// :
// {caption: "Craig Willmore's office", height: 480, image: 'https://cdn.mobygames.com/screenshots/11075086-the-x-files-game-windows-craig-willmores-office.jpg', thumbnail_image: 'https://cdn.mobygames.com/97ace7f0-ac15-11ed-83f5-02420a000134.webp', width: 640}
// 3
// :
// {caption: 'Catching on some clues. Wrong answer can easily mean end game.', height: 576, image: 'https://cdn.mobygames.com/screenshots/10471109-the…aystation-catching-on-some-clues-wrong-answer.jpg', thumbnail_image: 'https://cdn.mobygames.com/6b197e2e-ac10-11ed-833b-02420a000131.webp', width: 720}
// 4
// :
// {caption: "Sometimes, when you're not asking questions, you c…te in which mood do you want to answer something.", height: 576, image: 'https://cdn.mobygames.com/screenshots/10470751-the…aystation-sometimes-when-youre-not-asking-que.jpg', thumbnail_image: 'https://cdn.mobygames.com/6dfcf648-ac10-11ed-803a-02420a000131.webp', width: 720}
// length
// :
// 5
// [[Prototype]]
// :
// Array(0)
// title
// :
// "The X-Files Game"
