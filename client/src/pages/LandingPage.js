import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import LOGO from "../images/logo.png";
import Hero from "../components/hero";
import Features from "../components/features";
import About from "../components/about";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "inherit",
    width: "fit-content",
  },
  content: {
    textAlign: "center",
    maxWidth: "80%",
    margin: "0 auto",
    color: "#00A6FB",
    textShadow: "5px 5px 5px #000",
    background: "#051923",
    padding: "20px",
  },
  imgContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  img: {
    width: "50%",
    marginBottom: "20px",
  },
  text: {
    fontSize: "18px",
    margin: "10px 0",
    lineHeight: "30px",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    background: "#051922",
    padding: "10px",
    margin: "0",
    alignItems: "center",
    height: "fit-content",
    listStyle: "none",
    padding: "0",
    textAlign: "center",
  },
  navItem: {
    margin: "0 10px",
    color: "#00A6FB",
    cursor: "pointer",
    borderRadius: "20px",
    padding: "8px 12px",
    border: "2px solid #00A6FB",
    textDecoration: "none",
    display: "inline-block",
  },
};

export default function LandingPage() {
  return (
    <>
      <ul style={styles.nav}>
        <li>
          <a href="#Why" style={styles.navItem}>
            Why us
          </a>
        </li>
        <li>
          <a href="#getStarted" style={styles.navItem}>
            Get Started
          </a>
        </li>
      </ul>
      <Hero />
      <Features id="Why" />
      <About id="getStarted" />
    </>
  );
}
