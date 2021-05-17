import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import '../header/header.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
class Navigation extends React.Component {
  render() {
    return (
      <>
        <nav
          className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block "
          id="templatemo_nav_top"
        >
          <div className="container text-light">
            <div className="w-100 d-flex justify-content-between">
              <div>
                <i className="fa fa-envelope mx-2" />
                <a
                  className="navbar-sm-brand text-light text-decoration-none"
                  href="mailto:info@company.com"
                >
                  hanu_shoes@s.hanu.edu.vn
                </a>
                <i className="fa fa-phone mx-2" />
                <a
                  className="navbar-sm-brand text-light text-decoration-none"
                  href="tel:010-020-0340"
                >
                  010-020-0340
                </a>
              </div>
              <div>
                <i class="fab fa-facebook-square"></i>
                {/* <i class="fab fa-facebook-messenger"></i> */}

                <a
                  className="text-light"
                  href="https://www.instagram.com/"
                  target="_blank"
                >
                  <i className="fab fa-instagram fa-sm fa-fw me-2" />
                </a>
                <a
                  className="text-light"
                  href="https://twitter.com/"
                  target="_blank"
                >
                  <i className="fab fa-twitter fa-sm fa-fw me-2" />
                </a>
                <a
                  className="text-light"
                  href="https://www.linkedin.com/"
                  target="_blank"
                >
                  <i className="fab fa-linkedin fa-sm fa-fw" />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
export default Navigation;
