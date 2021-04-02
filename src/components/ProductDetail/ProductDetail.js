import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://ema-john-server-by-asif.herokuapp.com/${productKey}`)
      .then((res) => res.json())
      .then((data) => setProduct(data[0]));
  }, [productKey]);

  return (
    <div>
      <Product key={product.key} product={product} showAddToCart={false}></Product>
    </div>
  );
};

export default ProductDetail;
