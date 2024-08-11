import { useEffect } from "react";
import styles from "./AboutPage.module.css";

// Icons
import { FaGithub } from "react-icons/fa";
import { RiGitRepositoryFill } from "react-icons/ri";

function AboutPage() {
  useEffect(() => {
    document.title = "About | GameVault";

    return () => {
      document.title = "GameVault";
    };
  }, []);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>GameVault</h2>
        </div>
        <p>
          Welcome to GameVault, your ultimate destination for exploring the world of video games! At
          GameVault, we bring together a vast collection of games, offering you detailed description,
          screenshots, and information about your favorite titles.
        </p>
      </main>
      <footer className={styles.footer}>
        <p>Made by BodiAli</p>
        <div>
          <a href="https://github.com/BodiAli">
            <FaGithub color="#386c5f" />
          </a>
          <a href="https://github.com/BodiAli/shopping-cart">
            <RiGitRepositoryFill color="#386c5f" />
          </a>
        </div>

        <p>© {new Date().getFullYear()} GameVault. All rights reserved.</p>
      </footer>
    </>
  );
}

export default AboutPage;
