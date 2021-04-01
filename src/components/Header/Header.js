import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { userContext } from "../../App";

const Header = () => {
  const [loggedUser, setLoggedUser] = useContext(userContext);

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
          <li>{loggedUser && loggedUser.isSignedIn === true ? <button onClick={() => setLoggedUser({})}>Sign Out</button> : <Link to="/login">Login</Link>}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
