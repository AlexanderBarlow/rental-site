import React from "react";
import 'materialize-css/dist/css/materialize.min.css';
import LOGO from "../images/logo.png";
import Hero from "../components/hero";
import Features from "../components/features";
import About from "../components/about";



const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: "inherit",
    width: "fit-content",
  },
  content: {
    textAlign: 'center',
    maxWidth: '80%', // Adjust the maximum width to 80%
    margin: '0 auto',
    color: '#00A6FB',
    textShadow: '5px 5px 5px #000',
    background: '#051923',
    padding: '20px', // Add padding to the content
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'column', // Change to column layout on smaller screens
    alignItems: 'center',
    marginTop: '20px',
  },
  img: {
    width: '50%',
    marginBottom: '20px', // Add spacing below the image
  },
  text: {
    fontSize: '18px', // Increase the text font size
    margin: '10px 0', // Add vertical margin to the text
  },
};

export default function LandingPage() {
  return (
    <>
    <Hero />
    <Features />
    <About />
    </>
  );
}
