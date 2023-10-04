import React from "react";
import 'materialize-css/dist/css/materialize.min.css';
import LOGO from "../images/logo.png";


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    width: '100%',
    background: "#006494",
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
    <div style={styles.container}>
      <div id="card" style={styles.content}>
        <img src={LOGO} alt='logo' style={styles.img}></img>
        <div style={styles.imgContainer}>
          <p style={styles.text}>
            Login or Sign up to rent products or services near you! Want to start
            making some extra dough! You too can add your items to the marketplace.
          </p>
          <img src='Hotpot.png' alt='' style={styles.img}></img>
        </div>
      </div>
    </div>
  );
}
