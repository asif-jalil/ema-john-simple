import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./ReviewItem.css";
import { Link } from "react-router-dom";

const ReviewItem = (props) => {
  const { name, img, seller, price, key, quantity } = props.product;
  return (
    <div className="product-item">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div className="product-detail">
        <h4 className="name">
          <Link to={"/product/" + key}>{name}</Link>
        </h4>
        <p className="seller">by: {seller}</p>
        <div className="product-meta">
          <div className="meta-left">
            <p className="price">${price}</p>
            <p className="price">Quantiry: {quantity}</p>
            <button onClick={() => props.handleRemoveCart(props.product)} className="button">
              <FontAwesomeIcon icon="shopping-cart" /> remove product
            </button>
          </div>
          <div className="meta-right">
            <div className="shipping-info">
              <h4>Shipping Option</h4>
              <div className="shipping-option">
                <input type="radio" name="shipping" id="ship-1" />
                <label htmlFor="ship-1">8-10 business day</label>
                <p>
                  <small>$0 - Free shipping</small>
                </p>
              </div>
              <div className="shipping-option">
                <input type="radio" name="shipping" id="ship-1" />
                <label htmlFor="ship-1">5-17 business day</label>
                <p>
                  <small>$3.99 - Regular shipping</small>
                </p>
              </div>
              <div className="shipping-option">
                <input type="radio" name="shipping" id="ship-1" />
                <label htmlFor="ship-1">2-3 business day</label>
                <p>
                  <small>$7.99 - Express shipping</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
