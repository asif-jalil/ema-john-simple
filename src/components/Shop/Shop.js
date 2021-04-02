import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import "../../utilities/databaseManager";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const shuffle = (a) => {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://ema-john-server-by-asif.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    shuffle(products);
  }, [products]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch("https://ema-john-server-by-asif.herokuapp.com/productByKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));

    // if (products.length) {
    //   const cartProducts = productKeys.map((existingKey) => {
    //     const product = products.find((pd) => pd.key === existingKey);
    //     product.quantity = savedCart[existingKey];
    //     return product;
    //   });
    //   setCart(cartProducts);
    // }
  }, [products]);

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
