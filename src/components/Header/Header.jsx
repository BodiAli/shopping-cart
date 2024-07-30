import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <>
      <header className={styles.header}>
        <h1>GameVault</h1>
        <div className={styles.navContainer}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="shop">Shop</NavLink>
          <NavLink to="about">About</NavLink>
        </div>
      </header>
    </>
  );
}

export default Header;
