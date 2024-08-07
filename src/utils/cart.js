class Cart {
  constructor(products = []) {
    this.products = products;
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(product) {
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }

  isTheProductPresent(product) {
    return this.products.includes(product);
  }

  getAllPrices() {
    if (this.count !== 0) {
      return this.products
        .reduce((prevVal, currentVal) => {
          return prevVal + parseFloat(currentVal.price);
        }, 0)
        .toFixed(2);
    }
  }

  get count() {
    return this.products.length;
  }
}

export default Cart;
