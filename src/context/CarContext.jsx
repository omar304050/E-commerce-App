import axios from "axios";
import { createContext, useState } from "react";
import cart_api from "../apis/cart_api";
export let cartContext = createContext();

export default function CartContextProvider(props) {
  let [cart, setToCart] = useState();

  function addToCart(productId) {
    return cart_api.addToCart(productId);
  }
  function checkOut(cartId, url, formValue) {
    return cart_api.checkOut(cartId, url, formValue);
  }

  function removeCartItem(productId) {
    return cart_api.removeCart(productId);
  }

  function ubdateQuntity(productId, count) {
    return cart_api.ubdateQuntity(productId, count);
  }

  function getCartItem() {
   return  cart_api.getCartItem();
  }

  return (
    <cartContext.Provider
      value={{
        cart,
        setToCart,
        checkOut,
        addToCart,
        getCartItem,
        removeCartItem,
        ubdateQuntity,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
