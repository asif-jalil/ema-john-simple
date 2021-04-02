import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { userContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import "./Shipment.css";

const Shipment = () => {
  const [loggedUser, setLoggedUser, orderPlaced, setOrderPlaced] = useContext(userContext);
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const orderedProduct = getDatabaseCart();
    const orderDetails = { products: orderedProduct, shippingInfo: data, orderTime: new Date().toString() };
    fetch("https://ema-john-server-by-asif.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          setOrderPlaced(true);
          history.push("/review");
        }
      });
    console.log(orderDetails);
  };

  return (
    <>
      <form className="shipping-from" onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input name="name" ref={register({ required: true, pattern: /^[a-zA-Z '.-]*$/ })} defaultValue={loggedUser.name} />
        {errors.name && <p>This field is required</p>}

        <label>Email</label>
        <input name="email" ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} defaultValue={loggedUser.email} />
        {errors.email && <p>This field is required</p>}

        <label>Address</label>
        <input name="address" ref={register({ required: true })} />
        {errors.address && <p>This field is required</p>}

        <label>Phone</label>
        <input name="phone" ref={register({ required: true })} />
        {errors.phone && <p>This field is required</p>}
        <button type="submit">Place Order</button>
      </form>
    </>
  );
};

export default Shipment;
