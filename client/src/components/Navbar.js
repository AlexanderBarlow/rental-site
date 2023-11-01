import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import LOGO from "../images/logo1.png";
import Icon from "@mui/icons-material/ShoppingCart";
import { GET_CART } from "../utils/queries";
import { GET_CREDITS } from "../utils/queries";
import { useMediaQuery, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Badge, Divider } from "@mui/material";
import Icon2 from "@mui/icons-material/Menu";
import Auth from "../utils/auth";
import { makeStyles } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import anchorEl from "@mui/material/Menu";
import handleMobileMenuClose from "@mui/material/Menu";
import handleMobileMenuOpen from "@mui/material/Menu";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    if (creditData && creditData.userCredits) {
      setCredits(creditData.userCredits.amount);
    }
  }, [creditData]);

  useEffect(() => {
    if (data && data.userCart) {
      setCartTotal(data.userCart.length);
      setCartData(data.userCart);
    }
  }, [data]);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.replace("/");
  };

  const menuId = "primary-search-account-menu";

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleLinkClick = () => {
    handleMobileMenuClose(); // Close the mobile menu
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(null); // State for mobile menu anchor

  const handleMobileMenuOpen = (event) => {
    setMobileMenuOpen(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(null);
  };


  const MobileMenu = (
    <Menu
    anchorEl={mobileMenuOpen}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    id={menuId}
    keepMounted
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    open={Boolean(mobileMenuOpen)}
    onClose={handleMobileMenuClose} // Use the close function here
    PaperProps={{
      style: {
        background: "#051923", // Set your desired background color here
      }
    }}
  >
 <MenuItem component={Link} to="/market" onClick={handleLinkClick} sx={{color: "#FFF"}}>
        Market
      </MenuItem>
      <Divider />
      <MenuItem component={Link} to="/about" onClick={handleLinkClick} sx={{color: "#FFF"}}>
        About
      </MenuItem>
      <Divider />
      {Auth.loggedIn() ? (
        <MenuItem component={Link} to={`/profile/${userId}`} onClick={handleLinkClick} sx={{color: "#FFF"}}>
          Profile
        </MenuItem>
      ) : (
        <MenuItem component={Link} to="/login" onClick={handleLinkClick} sx={{color: "#FFF"}}>
          Login
        </MenuItem>
      )}
      <Divider />
      {Auth.loggedIn() && (
        <MenuItem component={Link} to="/checkout" onClick={handleLinkClick} sx={{color: "#FFF"}}>
          <Typography sx={{color: "#FFF"}}>
            <Icon /> ({cartTotal})
          </Typography>
        </MenuItem>
      )}
      <Divider />
      {Auth.loggedIn() && (
        <MenuItem component={Link} to="/addcredits" onClick={handleLinkClick} sx={{color: "#FFF"}}>
          ${credits}
        </MenuItem>
      )}
      <Divider />
      {Auth.loggedIn() && (
        <MenuItem sx={{color: "#FFF"}} onClick={() => {
          logout();
          handleLinkClick();
        }}>
          Logout
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <AppBar position="static" style={{background: "#051923"}}>
      <Toolbar>
        <img src={LOGO} alt="logo" style={{ height: "50px", width: "50px", padding: "2px" }} />
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit", paddingLeft: "20px" }}>
          NestEase
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
            >
              <Icon2 />
            </IconButton>
            {MobileMenu}
          </>
        ) : (
          <div>
            <Typography component={Link} to="/market" variant="h6" sx={{ marginRight: "20px", fontWeight: "600", textDecoration: "none", color: "inherit" }}>
              Market Place
            </Typography>
            <Typography component={Link} to="/about" variant="h6" sx={{ marginRight: "20px", fontWeight: "600", textDecoration: "none", color: "inherit" }}>
              About
            </Typography>
            {Auth.loggedIn() ? (
              <Typography component={Link} to={`/profile/${userId}`} variant="h6" sx={{ marginRight: "20px", fontWeight: "600", textDecoration: "none", color: "inherit" }}>
                Profile
              </Typography>
            ) : (
              <Typography component={Link} to="/login" variant="h6" sx={{ marginRight: "20px", fontWeight: "600", textDecoration: "none", color: "inherit" }}>
                Login
              </Typography>
            )}
            {Auth.loggedIn() && (
              <Typography component={Link} to="/checkout" variant="h6" sx={{ marginRight: "20px", fontWeight: "600", textDecoration: "none", color: "inherit" }}>
                <Badge badgeContent={cartTotal} color="secondary">
                  <Icon />
                </Badge>
              </Typography>
            )}
            {Auth.loggedIn() && (
              <Typography component={Link} to="/addcredits" variant="h6" sx={{ marginRight: "20px", fontWeight: "600", textDecoration: "none", color: "inherit" }}>
                ${credits}
              </Typography>
            )}
            {Auth.loggedIn() && (
              <Typography component={Link} to="/" onClick={logout} variant="h6" sx={{ marginRight: "20px", fontWeight: "600", textDecoration: "none", color: "inherit" }}>
                Logout
              </Typography>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
