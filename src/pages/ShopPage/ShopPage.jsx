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

          <NavLink to="mac">Mac</NavLink>

          <NavLink to="linux">Linux</NavLink>
        </ul>
        <h2>Genres</h2>
        <ul className={styles.navigation}>
          <NavLink to="action">Action</NavLink>

          <NavLink to="adventure">Adventure</NavLink>

          <NavLink to="education">Education</NavLink>

          <NavLink to="arcade">Arcade</NavLink>

          <NavLink to="racing">Racing</NavLink>

          <NavLink to="simulation">Simulation</NavLink>

          <NavLink to="sports">Sports</NavLink>

          <NavLink to="strategy">Strategy</NavLink>

          <NavLink to="role-playing">Role Playing</NavLink>
        </ul>
      </aside>
      <Outlet />
    </main>
  );
}

export default ShopPage;
