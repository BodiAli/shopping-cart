import PropTypes from "prop-types";
import Cart from "../../utils/cart";
import styles from "./CartComponent.module.css";
function CartComponent({ cart, isActive, onButtonClick, handleInputChange }) {
  return (
    <section className={`${styles.cart} ${isActive ? styles.isActive : ""}`}>
      <button onClick={onButtonClick}>X</button>
      <div className={styles.container}>
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
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

CartComponent.propTypes = {
  cart: PropTypes.instanceOf(Cart).isRequired,
  isActive: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default CartComponent;
