import React from "react";
import "./Header.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="" />
      <nav>
        <ul>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/review">Review</Link>
          </li>
          <li>
            <Link to="/inventory">Manage Inventory</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
