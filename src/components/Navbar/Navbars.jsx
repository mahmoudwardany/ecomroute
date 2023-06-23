import React, { useContext } from "react";
import { Link } from "react-router-dom";
import imgLogo from "../../assets/freshcart-logo.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { CartContext } from "../../share/CartContext";
export default function Navbar({ userData, logOut }) {
  let { cart } = useContext(CartContext);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand " to="/">
            <img src={imgLogo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            {userData !== null ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <Link
                    className="nav-link active fw-bold"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active fw-bold" to="cart">
                    Cart
                  </Link>
                </li>
              </ul>
            ) : null}

            {userData === null ? (
              <ul className="navbar-nav ms-auto  mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <Link className="nav-link active fw-bold" to="/register ">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active fw-bold" to="login">
                    Login
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav mb-2 mb-lg-0 ">
                <Link to={"/cart"}>
                  <li className="nav-item pt-2 mx-2">
                    <Badge badgeContent={cart?.numOfCartItems} color="success">
                      <ShoppingCartIcon color="action" />
                    </Badge>
                  </li>
                </Link>

                <li className="nav-item cursor">
                  <span className="nav-link fw-bold " onClick={logOut}>
                    Logout
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
