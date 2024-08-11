import { useEffect, useState } from "react";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import CartComponent from "../../components/CartComponent/CartComponent";
import Cart from "../../utils/cart";
import styles from "./ShopPage.module.css";

// Icons
import { SiWindows11, SiApplearcade, SiDwavesystems } from "react-icons/si";
import { BiSolidCategory } from "react-icons/bi";
import { CgGames } from "react-icons/cg";
import { MdLaptopMac } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { VscTerminalLinux } from "react-icons/vsc";
import { FaPlaystation, FaAppStoreIos } from "react-icons/fa";
import { TiVendorAndroid } from "react-icons/ti";

import {
  GiPistolGun,
  GiMountainRoad,
  GiOpenBook,
  GiCarWheel,
  Gi3dGlasses,
  GiChessKnight,
} from "react-icons/gi";
import { FaPuzzlePiece } from "react-icons/fa6";

function ShopPage() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { arr, handleButtonClick } = useOutletContext();
  const [cart, setCart] = arr;

  useEffect(() => {
    document.title = "Shop | GameVault";

    if (isAsideOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }

    return () => {
      document.title = "GameVault";
    };
  }, [isAsideOpen]);

  function handleViewAside() {
    setIsAsideOpen(!isAsideOpen);
  }

  function handleViewCart() {
    setIsActive(!isActive);
  }

  function handleProductRemove(game) {
    const newCart = new Cart(cart.products);
    newCart.removeProduct(game);
    setCart(newCart);
  }

  function handleInputChange(e, game) {
    const number = parseFloat(e.target.value);
    if (!isNaN(number) && number > 0) {
      const quantity = number;

      setCart(
        new Cart(
          cart.products.map((product) => {
            if (product === game) {
              return {
                ...product,
                quantity: quantity,
                price: product.originalPrice * quantity,
              };
            } else {
              return product;
            }
          })
        )
      );
    }
  }

  function removeProducts() {
    const newCart = new Cart([]);
    setCart(newCart);
    setIsActive(false);
  }

  return (
    <main className={styles.main}>
      <button
        onClick={handleViewAside}
        className={`${styles.viewAsideButton} ${isAsideOpen ? styles.isActive : ""}`}
      >
        <div className={styles.bar}></div>
      </button>
      <aside className={`${styles.aside} ${isAsideOpen ? styles.isOpen : ""}`}>
        <div onClick={handleViewCart} className={styles.viewCart}>
          <h2>
            <IoCartOutline size={"1.5em"} />
            View Cart
          </h2>
          <div data-testid="quantity" className={styles.count}>
            {cart.count}
          </div>
        </div>
        <h2>
          <CgGames size={"1.3em"} />
          Games
        </h2>
        <ul className={styles.navigation}>
          <NavLink to="games">
            <CgGames size={"1.2em"} />
            Games
          </NavLink>
        </ul>

        <h2>
          <SiDwavesystems size={"1.3em"} />
          Platforms
        </h2>
        <ul className={styles.navigation}>
          <NavLink to="windows">
            <SiWindows11 />
            Windows
          </NavLink>

          <NavLink to="mac">
            <MdLaptopMac size={"1.2em"} />
            Mac
          </NavLink>

          <NavLink to="linux">
            <VscTerminalLinux size={"1.2em"} />
            Linux
          </NavLink>

          <NavLink to="playstation">
            <FaPlaystation size={"1.2em"} />
            Playstation
          </NavLink>

          <NavLink to="android">
            <TiVendorAndroid size={"1.2em"} />
            Android
          </NavLink>

          <NavLink to="iphone">
            <FaAppStoreIos size={"1.2em"} />
            iPhone
          </NavLink>
        </ul>
        <h2>
          <BiSolidCategory size={"1.3em"} />
          Genres
        </h2>
        <ul className={styles.navigation}>
          <NavLink to="action">
            <GiPistolGun size={"1.2em"} />
            Action
          </NavLink>

          <NavLink to="adventure">
            <GiMountainRoad size={"1.2em"} />
            Adventure
          </NavLink>

          <NavLink to="education">
            <GiOpenBook size={"1.2em"} />
            Educational
          </NavLink>

          <NavLink to="puzzle">
            <FaPuzzlePiece size={"1.2em"} />
            Puzzle
          </NavLink>

          <NavLink to="arcade">
            <SiApplearcade size={"1.2em"} />
            Arcade
          </NavLink>

          <NavLink to="racing">
            <GiCarWheel size={"1.2em"} />
            Racing
          </NavLink>

          <NavLink to="simulation">
            <Gi3dGlasses size={"1.2em"} />
            Simulation
          </NavLink>

          <NavLink to="strategy">
            <GiChessKnight size={"1.2em"} />
            Strategy
          </NavLink>
        </ul>
      </aside>
      <CartComponent
        handleCartVisibility={handleViewCart}
        cart={cart}
        handleInputChange={handleInputChange}
        isActive={isActive}
        handleProductRemove={handleProductRemove}
        removeProducts={removeProducts}
      />
      <Outlet context={{ arr, handleButtonClick }} />
    </main>
  );
}

export default ShopPage;
