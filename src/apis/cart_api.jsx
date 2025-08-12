import axiosInstance from "../utils/axiosInstance";

const cart = {
  removeCart(productId) {
    return axiosInstance.delete(`/cart/${productId}`);
  },

  addToCart(productId) {
    return axiosInstance.post("cart", { productId });
  },

  ubdateQuntity(productId, count) {
    return axiosInstance.put(`cart/${productId}`, { count });
  },
  getCartItem() {
   return axiosInstance.get("cart");
  },
  checkOut(cartId, url, formValue) {
    return axiosInstance.post(`/orders/checkout-session/${cartId}?url=${url}`, {
      shippingAddress: formValue,
    });
  },
};

export default cart;
