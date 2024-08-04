import { useState } from "react";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import CartComponent from "../../components/CartComponent/CartComponent";
import Cart from "../../utils/cart";
import styles from "./ShopPage.module.css";

function ShopPage() {
  const [isActive, setIsActive] = useState(false);
  const [cart, setCart] = useOutletContext();

  function handleViewCart() {
    setIsActive(!isActive);
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

  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <div onClick={handleViewCart} className={styles.viewCart}>
          <h2>View Cart</h2>
          <div data-testid="quantity" className={styles.count}>
            {cart.products.length}
          </div>
        </div>
        <h2>Games</h2>
        <ul className={styles.navigation}>
          <NavLink to="games">Games</NavLink>
        </ul>

        <h2>Platforms</h2>
        <ul className={styles.navigation}>
          <NavLink to="windows">Windows</NavLink>

          <NavLink to="mac">Mac</NavLink>

          <NavLink to="linux">Linux</NavLink>

          <NavLink to="playstation">Playstation</NavLink>

          <NavLink to="android">Android</NavLink>

          <NavLink to="iphone">iPhone</NavLink>
        </ul>
        <h2>Genres</h2>
        <ul className={styles.navigation}>
          <NavLink to="action">Action</NavLink>

          <NavLink to="adventure">Adventure</NavLink>

          <NavLink to="education">Educational</NavLink>

          <NavLink to="puzzle">Puzzle</NavLink>

          <NavLink to="arcade">Arcade</NavLink>

          <NavLink to="racing">Racing</NavLink>

          <NavLink to="simulation">Simulation</NavLink>

          <NavLink to="strategy">Strategy</NavLink>
        </ul>
      </aside>
      <CartComponent
        onButtonClick={handleViewCart}
        cart={cart}
        handleInputChange={handleInputChange}
        isActive={isActive}
      />
      <Outlet context={[cart, setCart]} />
    </main>
  );
}

export default ShopPage;
