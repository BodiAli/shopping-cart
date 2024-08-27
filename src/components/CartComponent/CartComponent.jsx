import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import Cart from "../../utils/cart";
import styles from "./CartComponent.module.css";

function CartComponent({
  cart,
  isActive,
  handleCartVisibility,
  handleInputChange,
  handleProductRemove,
  emptyCart,
}) {
  const [checkoutAnimation, setCheckoutAnimation] = useState(false);
  const [tickAnimation, setTickAnimation] = useState(false);

  const totalPrice = useMemo(() => {
    return cart.getAllPrices();
  }, [cart]);

  function handleClick() {
    setCheckoutAnimation(true);
  }

  let content;
  if (cart.count === 0) {
    content = <p className={styles.empty}>Cart is empty!</p>;
  } else {
    content = (
      <>
        {cart.products.map((product) => {
          return (
            <div key={product.title} className={styles.card}>
              <div className={styles.imageContainer}>
                <img
                  src={product.sample_cover ? product.sample_cover.thumbnail_image : ""}
                  alt={`${product.title} product poster`}
                />
              </div>
              <div className={styles.textContainer}>
                <h3>{product.title}</h3>
                <div className={styles.cartInfoContainer}>
                  <div className={styles.priceContainer}>
                    <p>{`Price: ${product.price}$`}</p>
                    <input
                      onChange={(e) => handleInputChange(e, product)}
                      value={product.quantity}
                      type="number"
                      name="quantity"
                      className={styles.quantityInput}
                    />
                  </div>
                  <button onClick={() => handleProductRemove(product)} className={styles.remove}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <button className={styles.checkout}>
          <p
            className={checkoutAnimation ? styles.checkoutAnimation : ""}
            onClick={handleClick}
            onAnimationEnd={() => {
              setTickAnimation(true);
            }}
          >
            Checkout
            <br />
            <span className={styles.total}>Total: {totalPrice}$</span>
          </p>

          <p
            className={`${styles.tick} ${tickAnimation ? styles.tickAnimation : ""}`}
            onAnimationEnd={() => {
              setTimeout(() => {
                setCheckoutAnimation(false);
                setTickAnimation(false);
                emptyCart();
              }, 2000);
            }}
          >
            Done!
          </p>
        </button>
      </>
    );
  }

  return (
    <section data-testid={"cart"} className={`${styles.cart} ${isActive ? styles.isActive : ""}`}>
      <button className={styles.closeButton} onClick={handleCartVisibility}>
        X
      </button>
      <div className={styles.container}>{content}</div>
    </section>
  );
}

CartComponent.propTypes = {
  cart: PropTypes.instanceOf(Cart).isRequired,
  isActive: PropTypes.bool,
  handleCartVisibility: PropTypes.func,
  handleInputChange: PropTypes.func.isRequired,
  handleProductRemove: PropTypes.func.isRequired,
  emptyCart: PropTypes.func,
};

export default CartComponent;
