import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

// Icons
import { IoHome } from "react-icons/io5";
import { IoIosPricetags } from "react-icons/io";
import { FaCircleExclamation } from "react-icons/fa6";

function Header() {
  return (
    <>
      <header className={styles.header}>
        <h1>GameVault</h1>
        <div className={styles.navContainer}>
          <NavLink to="/">
            <IoHome />
            Home
          </NavLink>
          <NavLink to="shop/games">
            <IoIosPricetags />
            Shop
          </NavLink>
          <NavLink to="about">
            <FaCircleExclamation />
            About
          </NavLink>
        </div>
      </header>
    </>
  );
}

export default Header;
