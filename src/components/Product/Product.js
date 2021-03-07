import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Product.css";
import { Link } from "react-router-dom";
import "../../utilities/databaseManager";

const Product = (props) => {
  const { name, img, seller, price, stock, star, features, key } = props.product;
  const stars = [];
  const blankStars = [];
  for (let i = 0; i < star; i++) {
    stars.push(<FontAwesomeIcon icon="star" />);
  }
  for (let i = 0; i < 5 - star; i++) {
    blankStars.push(<FontAwesomeIcon icon={["far", "star"]} />);
  }
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
            <p className="stock">Only {stock} left in stock - order soon</p>
            {props.showAddToCart && (
              <button className="button" onClick={() => props.handleAddProduct(props.product)}>
                <FontAwesomeIcon icon="shopping-cart" /> add to cart
              </button>
            )}
          </div>
          <div className="meta-right">
            <div className="review">
              <span>
                {/* {stars.map((star) => star)} */}
                {stars}
                {/* {blankStars.map((star) => star)} */}
                {blankStars}
              </span>
            </div>
            <div className="feature">
              <h5>Feature</h5>
              <ul className="feature-list">
                {features.map((feature, keyIndex) => (
                  <li key={keyIndex}>
                    {feature.description}: {feature.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
