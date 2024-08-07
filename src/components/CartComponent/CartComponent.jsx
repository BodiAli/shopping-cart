import PropTypes from "prop-types";
import Cart from "../../utils/cart";
import styles from "./CartComponent.module.css";
function CartComponent({ cart, isActive, handleCartVisibility, handleInputChange, handleProductRemove }) {
  let content;

  if (cart.products.length === 0) {
    content = <p className={styles.empty}>Cart is empty!</p>;
  } else {
    content = cart.products.map((product) => {
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
    });
  }

  return (
    <section data-testid={"cart"} className={`${styles.cart} ${isActive ? styles.isActive : ""}`}>
      <button className={styles.closeButton} onClick={handleCartVisibility}>
        X
      </button>
      <div className={styles.container}>
        {content}
        <button className={styles.checkout}>Checkout</button>
      </div>
    </section>
  );
}

CartComponent.propTypes = {
  cart: PropTypes.instanceOf(Cart).isRequired,
  isActive: PropTypes.bool,
  handleCartVisibility: PropTypes.func,
  handleInputChange: PropTypes.func.isRequired,
  handleProductRemove: PropTypes.func.isRequired,
};

export default CartComponent;
