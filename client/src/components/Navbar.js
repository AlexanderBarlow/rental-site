import React, { useEffect, useState } from "react";
import "materialize-css/dist/css/materialize.min.css";
import { Link, useLocation } from "react-router-dom";
import Auth from '../utils/auth';
import LOGO from "../images/logo1.png";

const styles = {
  color: {
    background: "#051923",
    textAlign: "center",
    height: "fit-content",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    padding: '10px',
  },
  img: {
    height: '20%', // Set a fixed height
    width: '20%', // Set a fixed width
    padding: '2px',
  },
  logoText: {
    display: 'flex',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  li: {
    margin: '10px 20px', // Add margin for spacing
  },
  // Media Query for screens with a max width of 768px (adjust as needed)
  '@media (max-width: 768px)': {
    container: {
      flexDirection: 'column', // Stack items vertically
    },
    logoText: {
      marginBottom: '10px', // Add space below logo and text
    },
    li: {
      margin: '10px 0', // Adjust margin for spacing
    },
    // Add styles for smaller screens here
  },
  // Additional Media Queries for smaller screens
  '@media (max-width: 576px)': {
    // Adjust styles for screens with a max width of 576px
    container: {
      display: 'inline-flex',
      flexDirection: 'row', // Stack items vertically
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1rem',
    },
  },
  '@media (max-width: 414px)': {
    // Adjust styles for screens with a max width of 414px (iPhone 12, for example)
  },
};

function Navbar() {
  const location = useLocation();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let id = Auth.getUserId();
    if (id) {
    id= id.data._id
    }
    setUserId(id || null);
  }, []);

  console.log(userId);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.replace('/');
  };

  return (
    <nav style={styles.color}>
      <div className="container" style={styles.container}>
        <div style={styles.logoText}>
          <img src={LOGO} alt='logo' style={styles.img} />
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
          {userId ? (
            <>
              <li style={styles.li}>
                <Link className="text-dark glow" to={`/${userId}`}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>Profile</h3>
                </Link>
              </li>
              <li style={styles.li}>
                <a className="text-dark glow" onClick={logout}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>Logout</h3>
                </a>
              </li>
            </>
          ) : (
            <>
              <li style={styles.li} className="login-link">
                <Link className="text-dark glow" to="/login">
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>Login</h3>
                </Link>
              </li>
              <li style={styles.li} className="signup-link">
                <Link className="text-dark glow" to="/signup">
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>Signup</h3>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
