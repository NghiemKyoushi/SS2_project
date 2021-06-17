/* eslint-disable */
import React from "react";
import Badge from '@material-ui/core/Badge';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getCookie, deleteCookie } from "../../utils/fetchData";
import { findCart } from '../../utils/fetchDataProduct'
import './header.css'

class Header extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     productCount: 
  //   }
  // }

  // async componentDidMount() {
  //   if (getCookie('login')) {
  //     const { sub } = jwt_decode(getCookie('login'));
  //     const cart = await findCart(sub);
  //     console.log(cart.products.length)

  //   }
  // }

  render() {
    const { isLogin, cartCount } = this.props;
    let uname = "User"
    let sub = "0"
    if (getCookie('login') !== "" && getCookie('login') != null) {
      const loginCookie = getCookie('login');
      uname = jwt_decode(loginCookie).uname;
      sub = jwt_decode(loginCookie).sub;
    }
    return (
      <>
        <nav id="header" className="navbar navbar-expand-lg navbar-light shadow  ">
          <div className=" d-flex justify-content-between w-100">
            <a className="navbar-brand text-success logo align-self-center h1">
              <h3 className="mb-0">Hanu_Shoes</h3>
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
                  <li className="nav-item pl-2 pr-2">
                    <Link to="/" className="nav-link ">
                      <h6 className="mb-0">HOME</h6>
                    </Link>
                  </li>
                  <li className="nav-item ml-60 pl-2 pr-2">
                    <a className="nav-link ">
                      <h6 className="mb-0">ABOUT</h6>
                    </a>
                  </li>
                  <li className="nav-item pl-2 pr-2">
                    <Link to="/product" className="nav-link">
                      <h6 className="mb-0">SHOP</h6>
                    </Link>
                  </li>
                  <li className="nav-item pl-2 pr-2">
                    <a className="nav-link">
                      <h6 className="mb-0">CONTACT</h6>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="navbar align-self-center d-flex justify-content-end" style={{ width: '240px' }}>
                {isLogin ? (<div className="flex-center" style={{ marginBottom: '0px' }}>
                  <div>
                    <span style={{ fontSize: '18px' }}>Hello </span>
                    <Link className="user-link" to={`/user/${sub}`}>
                      {`${uname}`}
                    </Link>
                  </div>
                  <Badge badgeContent={cartCount ? cartCount : 0} color="error" style={{ border: "none" }} >
                    <Link to="/cart">
                      <i className="fas fa-shopping-cart"></i>
                    </Link>
                  </Badge>
                  <button style={{ border: "none", backgroundColor: 'white' }} onClick={() => {
                    deleteCookie("login");
                    window.location.reload();
                  }} >
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                </div>
                ) : (
                  <div className="d-flex" >
                    <Link className="loginButton" to="/login">Login</Link>
                    <Link className="loginButton ml-4" to="/signup" >Register</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
export default Header;
