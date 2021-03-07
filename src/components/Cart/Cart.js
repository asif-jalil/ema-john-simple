import React from "react";
import "./Cart.css";

const Cart = (props) => {
  const cart = props.cart;

  const priceFormat = (value) => {
    const price = value.toFixed(2);
    return Number(price);
  };

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total = total + item.price * item.quantity;
  }

  let shipping = 0;
  if (total > 100) {
    shipping = 0;
  } else if (total > 50) {
    shipping = 4.99;
  } else if (total > 0) {
    shipping = 12.99;
  }

  let tax = (total * 10) / 100;

  return (
    <div>
      <div className="cart-header">
        <h2>Order Summary</h2>
        <h4>Items ordered: {cart.length}</h4>
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <small>Items:</small>
            </td>
            <td>
              <small> {cart.length}</small>
            </td>
          </tr>

          <tr>
            <td>
              <small>Shipping & Handling:</small>
            </td>
            <td>
              <small>${shipping}</small>
            </td>
          </tr>

          <tr>
            <td>
              <small>Total before tax:</small>
            </td>
            <td>
              <small>${priceFormat(total)}</small>
            </td>
          </tr>

          <tr>
            <td>
              <small>Estimated Tax:</small>
            </td>
            <td>
              <small>${priceFormat(tax)}</small>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr className="cart-total">
            <td>
              <small>Order Total:</small>
            </td>
            <td>
              <small>${priceFormat(shipping + total + tax)}</small>
            </td>
          </tr>
        </tfoot>
      </table>
      <div style={{ textAlign: "center" }}>{props.children}</div>
    </div>
  );
};

export default Cart;
