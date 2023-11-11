import { addToCart } from "./cartSlice";
import axios from "axios";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  try {

    const { data } = await axios.get(`http://localhost:5000/api/v1/product/${id}`);

    // Create an item object to add to the cart
    const item = {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    };


    // Dispatch the addToCart action with the item
    dispatch(addToCart(item));

    // Get the updated cart items from the Redux store state
    const updatedCartItems = getState().cart.cart.cartItems;

    // Store the updated cart items in localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  } catch (error) {
    alert('Not able to add items in cart')
  }
};
