import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from "react-router-dom";
import { textAlign } from "@mui/system";

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
};

function Navbar() {
  return (
    <nav style={styles.color}>
      <div className="container">
        <ul style={styles.ul}>
          <li className="nav-items" style={styles.li}>
            <Link className="text-dark" to="/">
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
            <Link className="text-dark" to="/market">
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                Products
              </h3>
            </Link>
          </li>
          <li className="nav-items" style={styles.li}>
            <Link className="text-dark" to="/services">
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                Services
              </h3>
            </Link>
          </li>
          <li style={styles.li}>
            <Link className="text-dark" to="/login">
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>Login</h3>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
