import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import "../../utilities/databaseManager";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
  // const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(fakeData.slice(0, 10));
  }, []);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    console.log(productKeys);
    const cartProducts = productKeys.map((existingKey) => {
      const product = fakeData.find((pd) => pd.key === existingKey);
      product.quantity = savedCart[existingKey];
      return product;
    });
    setCart(cartProducts);
  }, []);

  const handleAddProduct = (product) => {
    const sameProduct = cart.find((pd) => pd.key === product.key);
    let count = 1;
    let newCart = [];
    if (sameProduct) {
      count = product.quantity + 1;
      product.quantity = count;
      const otherProduct = cart.filter((pd) => pd.key !== product.key);
      newCart = [...otherProduct, product];
    } else {
      newCart = [...cart, product];
      product.quantity = 1;
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((pd) => (
          <Product key={pd.key} product={pd} handleAddProduct={handleAddProduct} showAddToCart={true}></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="button">Review your order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
