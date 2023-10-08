import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "./styles/glow.css";

const styles = {
  color: {
    background: "#051923",
    height: "100%",
  },
  img: {
    height: "35%",
    width: "35%",
  },
};

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <footer class="page-footer" style={styles.color}>
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">Thank You For Choosing NestEase!</h5>
            <p class="grey-text text-lighten-4">
              Rental Services are a quick and convienent way to make some extra
              money.
            </p>
          </div>
          <div class="col l4 offset-l2 s12">
            <h5 class="white-text">Developers</h5>
            <ul>
              <li>
                <a
                  class="grey-text text-lighten-3"
                  href="https://www.linkedin.com/in/alexanderlbarlow/"
                  className="glow"
                >
                  Alexander Barlow
                </a>
              </li>
              <li>
                <a class="grey-text text-lighten-3" href="#!" className="glow">
                  Dylan Pinkus
                </a>
              </li>
              <li>
                <a class="grey-text text-lighten-3" href="#!" className="glow">
                  Jamie Harris
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container">
          Link to sites repo.
          <a
            class="grey-text text-lighten-4 right"
            href="https://github.com/AlexanderBarlow/rental-site"
          >
            <img
              src="github-mark.png"
              alt="github logo"
              style={styles.img}
              className="img"
            ></img>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
