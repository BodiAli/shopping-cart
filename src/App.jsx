import { useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "./components/Header/Header";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Cart from "./utils/cart";
import "./App.css";

function App() {
  const [cart, setCart] = useState(new Cart([]));
  const navigation = useNavigation();
  function handleButtonClick(e, game) {
    e.stopPropagation();
    const newCart = new Cart(cart.products);
    if (newCart.isTheProductPresent(game)) {
      newCart.removeProduct(game);
      setCart(newCart);
    } else {
      newCart.addProduct(game);
      setCart(newCart);
    }
  }

  return (
    <>
      <Header />
      {navigation.state === "loading" ? (
        <LoadingSpinner />
      ) : (
        <Outlet context={{ arr: [cart, setCart], handleButtonClick: handleButtonClick }} />
      )}
    </>
  );
}

export default App;
