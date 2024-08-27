class Cart {
  constructor(products = []) {
    this.products = products;
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(product) {
    const index = this.products.findIndex((val) => {
      return val.game_id === product.game_id;
    });
    this.products.splice(index, 1);
  }

  isTheProductPresent(product) {
    return this.products.some((val) => val.game_id === product.game_id);
  }

  getAllPrices() {
    if (this.count !== 0) {
      return this.products
        .reduce((total, product) => {
          return total + parseFloat(product.price);
        }, 0)
        .toFixed(2);
    }
  }

  get count() {
    return this.products.length;
  }
}

export default Cart;
