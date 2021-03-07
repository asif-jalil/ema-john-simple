import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import fakeData from "../../fakeData";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { productKey } = useParams();
  const [products, setProducts] = useState(fakeData);
  useEffect(() => {
    setProducts(fakeData);
  }, []);
  const product = products.find((pd) => pd.key === productKey);
  return (
    <div>
      <Product key={product.key} product={product} showAddToCart={false}></Product>
    </div>
  );
};

export default ProductDetail;
