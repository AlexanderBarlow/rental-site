import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./styles/glow.css";

const styles = {
  color: {
    background: "#006494",
    height: "100%",
    paddingTop: "20px",
    marginBottom: "0",
    paddingBottom: "20px",
  },
  img: {
    height: "35%",
    width: "35%",
  },
};

const Footer = () => {
  return (
    <footer className="page-footer" style={styles.color}>
      <div className="container">
        <div className="row">
          <div className="col s12 m6 l6">
            <h5 className="white-text">Thank You For Choosing NestEase!</h5>
            <p className="grey-text text-lighten-4">
              Rental Services are a quick and convenient way to make some extra
              money.
            </p>
          </div>
          <div className="col s12 m6 l6">
            <h5 className="white-text">Developers</h5>
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/in/alexanderlbarlow/"
                  className="grey-text text-lighten-3 glow"
                >
                  Alexander Barlow
                </a>
              </li>
              <li>
                <a href="#!" className="grey-text text-lighten-3 glow">
                  Dylan Pinkus
                </a>
              </li>
              <li>
                <a href="#!" className="grey-text text-lighten-3 glow">
                  Jamie Harris
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row" style={{ alignItems: "center", display: "flex" }}>
          <div className="col s12 m6 l6 left-align">
            <p style={{ marginBottom: 0 }}>
              Link to site's repository:
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
