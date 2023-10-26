import React, { useState, useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import LOGO from "../images/logo1.png";
import Icon from '@mui/icons-material/Menu';
import M from 'materialize-css';


const styles = {
  color: {
    background: "#051923",
    textAlign: "center",
    height: "fit-content",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    padding: "10px",
  },
  img: {
    height: "20%", // Set a fixed height
    width: "20%", // Set a fixed width
    padding: "2px",
  },
  logoText: {
    display: "flex",
    alignItems: "center",
  },
  nav: {
    display: "flex",
    alignItems: "center",
  },
  li: {
    margin: "10px 20px", // Add margin for spacing
  },
};

function DropdownTrigger() {
  useEffect(() => {
    // Initialize the dropdown
    const dropdownElement = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropdownElement);
  }, []);

  return (
    <a
      className="dropdown-trigger"
      href="#!"
      data-target="dropdown1"
    >
      <Icon baseClassName="fas" color="primary" />
    </a>
  );
}

function Navbar() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // You can adjust the breakpoint as needed
    };

    checkScreenSize(); // Check initial screen size
    window.addEventListener("resize", checkScreenSize); // Listen for screen size changes

    return () => {
      window.removeEventListener("resize", checkScreenSize); // Cleanup when the component unmounts
    };
  }, []);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.replace("/");
  };

  const userId = Auth.getToken();

  return (
    <>
      <ul id="dropdown1" className="dropdown-content">
        <li>
          <Link to='/login'>
          <p>Login</p>
          </Link>
        </li>
        <li className="divider"></li>
        <li>
          <Link to='/market'>
          <p >Market</p>
          </Link>
        </li>
        <li className="divider"></li>
        <li>
          <Link to='/about'>
          <p>About</p>
          </Link>
        </li>
      </ul>

      {isSmallScreen ? (
        <nav style={styles.color}>
          <div className="container" style={styles.container}>
            <div style={styles.logoText}>
              <img src={LOGO} alt="logo" style={styles.img} />
              <Link className="text-dark glow" to="/">
                <h3 style={{ fontSize: "1.5rem", margin: 0 }}>NestEase</h3>
              </Link>
            </div>
            <DropdownTrigger />
          </div>
        </nav>
      ) : (
        <nav style={styles.color}>
          <div className="container" style={styles.container}>
            <div style={styles.logoText}>
              <img src={LOGO} alt="logo" style={styles.img} />
              <Link className="text-dark glow" to="/">
                <h3 style={{ fontSize: "1.5rem", margin: 0 }}>NestEase</h3>
              </Link>
            </div>
            <ul className="nav nav-tabs" id="nav-mobile" style={styles.nav}>
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
              {Auth.loggedIn() ? (
                <li style={styles.li}>
                  <Link className="text-dark glow" to={`/profile/${userId}`}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                      Profile
                    </h3>
                  </Link>
                </li>
              ) : (
                <li style={styles.li} className="login-link">
                  <Link className="text-dark glow" to="/login">
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                      Login
                    </h3>
                  </Link>
                </li>
              )}
              {Auth.loggedIn() && (
                <li style={styles.li}>
                  <a href="" className="text-dark glow" onClick={logout}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                      Logout
                    </h3>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
