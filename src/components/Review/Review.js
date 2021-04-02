import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Review.css";
import thankImage from "../../images/giphy.gif";
import { userContext } from "../../App";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [loggedUser, setLoggedUser, orderPlaced, setOrderPlaced] = useContext(userContext);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const cartKeys = Object.keys(savedCart);

    fetch("https://ema-john-server-by-asif.herokuapp.com/productByKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));

    // const cartProducts = cartKeys.map((key) => {
    //   const product = fakeData.find((pd) => pd.key === key);
    //   product.quantity = savedCart[key];
    //   return product;
    // });
    // setCart(cartProducts);
  }, []);

  const handleProceedOrder = () => {};

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
      ) : orderPlaced === true ? (
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
            <Link to="/shipment">
              <button onClick={handleProceedOrder} className="button">
                Proceed Checkout
              </button>
            </Link>
          ) : (
            <button disabled className="button">
              No order to place
            </button>
          )}
        </Cart>
      </div>
    </div>
  );
};

export default Review;
