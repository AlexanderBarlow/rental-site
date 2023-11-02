import React from "react";
import { Link } from "react-scroll";
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
          <Link
            to="Why"
            style={styles.navItem}
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-70} // You can adjust the offset as needed
            duration={500}
          >
            Why us
          </Link>
        </li>
        <li>
          <Link
            to="getStarted"
            style={styles.navItem}
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-70} // You can adjust the offset as needed
            duration={500}
          >
            Get Started
          </Link>
        </li>
      </ul>
      <Hero />
      <Features id="Why" />
      <About id="getStarted" />
    </>
  );
}
