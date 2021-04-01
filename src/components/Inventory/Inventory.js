import React from "react";
import fakeData from "../../fakeData";

const Inventory = () => {
  const inventoryStyle = {
    textAlign: "center",
    fontSize: 40,
  };

  const handleAddProduct = () => {
    fetch("http://localhost:5000/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fakeData),
    });
  };

  return (
    <div style={inventoryStyle}>
      <button onClick={handleAddProduct} className="button">
        Add All Product
      </button>
    </div>
  );
};

export default Inventory;
