import { NavLink, Outlet } from "react-router-dom";
import styles from "./ShopPage.module.css";

function ShopPage() {
  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <h2>Games</h2>
        <ul className={styles.navigation}>
          <NavLink to="games">Games</NavLink>
        </ul>

        <h2>Platforms</h2>
        <ul className={styles.navigation}>
          <NavLink to="windows">Windows</NavLink>

          <NavLink to="linux">Linux</NavLink>

          <NavLink to="mac">Mac</NavLink>
        </ul>
        <h2>Genres</h2>
        <ul className={styles.navigation}>
          <NavLink>Action</NavLink>

          <NavLink>Adventure</NavLink>

          <NavLink>Education</NavLink>

          <NavLink>Arcade</NavLink>

          <NavLink>Racing</NavLink>

          <NavLink>Simulation</NavLink>

          <NavLink>Sports</NavLink>

          <NavLink>Strategy</NavLink>

          <NavLink>Role Playing</NavLink>
        </ul>
      </aside>
      <Outlet />
    </main>
  );
}

export default ShopPage;
