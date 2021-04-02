import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../App";

const Header = () => {
  const [loggedUser, setLoggedUser, orderPlaced, setOrderPlaced] = useContext(userContext);

  return (
    <header className="header">
      <img src={logo} alt="" />
      <nav>
        <ul>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/review">Review</NavLink>
          </li>
          <li>
            <NavLink to="/inventory">Manage Inventory</NavLink>
          </li>
          <li>{loggedUser && loggedUser.isSignedIn === true ? <button onClick={() => setLoggedUser({})}>Sign Out</button> : <NavLink to="/login">Login</NavLink>}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
