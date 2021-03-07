import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fakeData from "../../fakeData";
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Review.css";
import thankImage from "../../images/giphy.gif";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const cartKeys = Object.keys(savedCart);
    const cartProducts = cartKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  const handleOrderPlace = () => {
    setCart([]);
    setOrderPlaced(true);
    processOrder();
  };

  const handleRemoveCart = (product) => {
    const remainProduct = cart.filter((pd) => product !== pd);
    removeFromDatabaseCart(product.key);
    setCart(remainProduct);
  };

  return (
    <div className="shop-container">
      {cart.length > 0 ? (
        <div className="product-container">
          {cart.map((pd) => (
            <ReviewItem key={pd.key} product={pd} handleRemoveCart={handleRemoveCart}></ReviewItem>
          ))}
        </div>
      ) : orderPlaced ? (
        <div className="product-container">
          <img src={thankImage} alt="" />
        </div>
      ) : (
        <div className="product-container empty-cart">
          <h1>Your cart is empty</h1>
          <Link to="/shop">
            <button className="button">Continue Shopping</button>
          </Link>
        </div>
      )}

      <div className="cart-container">
        <Cart cart={cart}>
          {cart.length > 0 ? (
            <Link to="/review">
              <button onClick={handleOrderPlace} className="button">
                Place Order
              </button>
            </Link>
          ) : (
            <Link to="/review">
              <button disabled className="button">
                No order to place
              </button>
            </Link>
          )}
        </Cart>
      </div>
    </div>
  );
};

export default Review;
