import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from "react-router-dom";
import { textAlign } from "@mui/system";
import Auth from '../utils/auth'
import LOGO from "../images/logo1.png";

const styles = {
  color: {
    background: "#051923",
    textAlign: "center",
  },
  ul: {
    textAlign: "center",
  },
  li: {
    textAlign: "center",
  },
  name: {
    font: "",
  },
  img: {
    height: '20%',
    width: '20%',
    padding: '2px',
  },
  licon: {
    display: 'flex'
  },
  container: {
    display:'flex-inline',
    flex: "row",
    height: '100%'
  }
};

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.replace('/')
  };
  
  return (
    <nav style={styles.color}>
      <div className="container flex" style={styles.container}>
        <ul style={styles.ul}>
          <li>
          <img src={LOGO} alt='logo' style={styles.img}></img>
          </li>
          <li className="nav-items" style={styles.li}>
            <Link className="text-dark glow" to="/">
              <h3 style={{ fontSize: "1.5rem" }}>NestEase</h3>
            </Link>
          </li>
        </ul>
        <ul
          className="nav nav-tabs"
          id="nav-mobile"
          class="right hide-on-med-and-down"
        >
          <li className="nav-items" style={styles.li}>
            <Link className="text-dark glow" to="/market">
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                Products
              </h3>
            </Link>
          </li>
          <li className="nav-items" style={styles.li}>
            <Link className="text-dark glow" to="/about">
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                About
              </h3>
            </Link>
          </li>
          <li style={styles.licon}>
            {Auth.loggedIn() ? (
              <>
              <Link className="text-dark glow" to="/profile">
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>Profile</h3>
              </Link>
              <a className="text-dark glow" onClick={logout}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>Logout</h3>
              </a>
              </>
            ) : (
            <Link className="text-dark glow" to="/login">
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>Login</h3>
            </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
