import React, { useState, useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import LOGO from "../images/logo1.png";
import Icon from "@mui/icons-material/ShoppingCart"; // Import the appropriate icon for the cart
import M from "materialize-css";
import { useQuery } from "@apollo/client";
import { GET_CART } from "../utils/queries";
import Icon2 from "@mui/icons-material/Menu";
import { GET_CREDITS } from "../utils/queries";

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
    const dropdownElement = document.querySelector(".dropdown-trigger");
    M.Dropdown.init(dropdownElement);
  }, []);

  return (
    <a className="dropdown-trigger" href="#!" data-target="dropdown1">
      <Icon2 baseClassName="fas" color="primary" />
    </a>
  );
}

function Navbar() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartData, setCartData] = useState(null);
  const [credits, setCredits] = useState(0);

  const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;

  const { loading, data } = useQuery(GET_CART, {
    variables: { userId },
    skip: !userId,
  });

  const { loading: creditLoading, data: creditData } = useQuery(GET_CREDITS, {
    variables: { userId },
    skip: !userId,
  });

  console.log(creditData);

  useEffect(() => {
    if(creditData && creditData.userCredits) {
      setCredits(creditData.userCredits.amount)
      console.log(creditData.userCredits.amount);
    }
  }, [creditData]);


  useEffect(() => {
    if (data && data.userCart) {
      setCartTotal(data.userCart.length);
      setCartData(data.userCart);
    }
  }, [data]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if(creditLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ul id="dropdown1" className="dropdown-content">
        <li className="divider"></li>
        <li>
          <Link to="/market">
            <h5>Market</h5>
          </Link>
        </li>
        <li className="divider"></li>
        <li>
          <Link to="/about">
            <h5>About</h5>
          </Link>
        </li>
        {Auth.loggedIn() ? (
          <li>
            <Link to={`/profile/${userId}`}>
              <h5>Profile</h5>
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <h5>Login</h5>
            </Link>
          </li>
        )}
        {Auth.loggedIn() && (
          <li style={styles.li}>
            <Link className="text-dark glow" to="/checkout">
              <h3 style={{ fontSize: "1", fontWeight: "700" }}></h3>
              <Icon />
              <span>({cartTotal})</span>
            </Link>
          </li>
        )}
        {Auth.loggedIn() && (
          <li>
            <a onClick={logout}>
              <h5>Logout</h5>
            </a>
          </li>
        )}
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
                    Market Place
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
              {Auth.loggedIn() && (
                <li style={styles.li}>
                  <Link className="text-dark glow" to="/checkout">
                    <h3 style={{ fontSize: "1", fontWeight: "700" }}></h3>
                    <Icon />
                    <span>({cartTotal})</span>
                  </Link>
                </li>
              )}
              {Auth.loggedIn() && (
                <li style={styles.li}>
                  <Link className="text-dark glow" to="/addcredits">
                    <h3 style={{ fontSize: "1", fontWeight: "700" }}></h3>
                    <span>${credits}</span>
                    </Link>
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
