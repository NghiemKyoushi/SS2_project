import React from "react";

import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
class Header extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light shadow ">
          <div className="container d-flex justify-content-between align-items-center">
            <a
              className="navbar-brand text-success logo align-self-center h1"
            >
              <h3>Hanu_Shoes</h3>
            </a>
            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#templatemo_main_nav"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-between"
              id="templatemo_main_nav"
            >
              <div className="flex-fill">
                <ul className="nav navbar-nav d-flex justify-content-center mx-lg-auto">
                  <li className="nav-item">
                    <a className="nav-link "  >
                      <h5>Home</h5>
                    </a>
                  </li>
                  <li className="nav-item ml-60 ">
                    <a className="nav-link "  >
                    <h5>About</h5>

                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">
                    <h5>Shop</h5>

                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" >
                    <h5>Contact</h5>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="navbar align-self-center d-flex">
                {/* <div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="inputMobileSearch"
                      placeholder="Search ..."
                    />
                    <div className="input-group-text">
                      <i className="fa fa-fw fa-search" />
                    </div>
                  </div>
                </div>
                <a
                  className="nav-icon d-none d-lg-inline"
                  data-bs-toggle="modal"
                  data-bs-target="#templatemo_search"
                >
                  <i className="fa fa-fw fa-search text-dark mr-2" />
                </a>
                <a
                  className="nav-icon position-relative text-decoration-none"
                >
                  <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"/>
                  <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                    7
                  </span>
                </a>
                <a
                  className="nav-icon position-relative text-decoration-none"
                >
                  <i className="fa fa-fw fa-user text-dark mr-3" />
                  <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                    +99
                  </span>
                </a> */}
                <Link to = '/login'>Login</Link>
                <Link to= '/signup' className ="ml-4">Register</Link>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
export default Header;
