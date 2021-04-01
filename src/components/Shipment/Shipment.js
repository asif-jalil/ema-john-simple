import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { userContext } from "../../App";
import { processOrder } from "../../utilities/databaseManager";
import "./Shipment.css";

const Shipment = () => {
  const [loggedUser, setOrderPlaced] = useContext(userContext);
  const history = useHistory();

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("example")); // you can watch individual input by pass the name of the input
  // console.log(watch("exampleRequired")); // you can watch individual input by pass the name of the input

  function handleOrder() {
    setOrderPlaced(true);
    processOrder();
    history.push("/review");
  }

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
        <button onClick={handleOrder} type="submit">
          Place Order
        </button>
      </form>
    </>
  );
};

export default Shipment;
