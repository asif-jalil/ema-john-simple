import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Product.css";

const Product = (props) => {
  const { name, img, seller, price, stock, star, features } = props.product;
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
        <h4 className="name">{name}</h4>
        <p className="seller">by: {seller}</p>
        <div className="product-meta">
          <div className="meta-left">
            <p className="price">${price}</p>
            <p className="stock">Only {stock} left in stock - order soon</p>
            <button className="button" onClick={() => props.handleAddProduct(props.product)}>
              <FontAwesomeIcon icon="shopping-cart" /> add to cart
            </button>
          </div>
          <div className="meta-right">
            <div className="review">
              <span>
                {stars.map((star) => star)}
                {blankStars.map((star) => star)}
              </span>
            </div>
            <div className="feature">
              <h5>Feature</h5>
              <ul className="feature-list">
                {features.map((feature) => (
                  <li>
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
