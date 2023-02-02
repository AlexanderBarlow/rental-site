import React from "react";
import 'materialize-css/dist/css/materialize.min.css';

const styles = {
    h1: {
        color: '#051923',
        fontFamily: '',
        padding: '50px',
        textAlign: 'center',
    },
    height: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center'
    },
    container: {
        position: 'absolute',
        padding: '10px',
        top: '25%',
        left: '15%',
        display: 'flex',
        border: '5px solid rgba(0, 0, 0, 0.5)',
        boxShadow: '5px 5px 5px #00A6FB',
        height: '50%',
    },
    content: {
    },
    img: {
      width: '50%'
    }
};

export default function LandingPage() {
  return (
    <main>
    <div style={styles.height}>
      <div className="container" style={styles.container}>
        <div style={styles.content}>
        <h1 className='font-link' style={styles.h1}>Renting Made Easy</h1>
        <p>
          Login or Sign up to rent products or services near you! Want to start
          making some extra dough! You too can add your items to the market
          place.
        </p>
        </div>
        <img src="Hotpot.png" alt='random generated art' style={styles.img}></img>
      </div>
    </div>
    </main>
  );
}
