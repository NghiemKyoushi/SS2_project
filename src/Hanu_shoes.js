import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./view/homepage/hompage";
//Route
import UnAuthenRoute from './route/viewer_route/unAuthen_route';
import ProtectedRouteAdmin from './route/admin-route/ProtectedRouteAdmin';
import Login from './admin/login/Login';
import { getCookie } from './utils/utils'
import { findCart } from './utils/fetchDataProduct'

// admin
import Navbar from './admin/navbar/Navbar';
import Sidebar from './admin/sidebar/Sidebar'
import Dashboard from './admin/dashboard/Dashboard'
import User from './admin/user/User'
import Product from './admin/product/Product'
import Order from './admin/order/Order'

// 
import jwt_decode from "jwt-decode";
import ProtectedRoute from './route/user_route/ProtectedRoute';
import NormalRoute from './route/viewer_route/NormalRoute'
//__________________________
import SignIn from './view/login/login';
import ShopPage from './view/shopPage/shopPage';
import ProductDetails from './view/productDetails/productDetails';
import Content from './component/content/content';
import Slide from './component/slide/slide';
import Cart from './view/cart/cart';
class Hanu_Shoes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Authentication: "",
      user: {},
      admin: {},
      isLogin: false,
      isAdminLogin: false,
      completed: false,
      cartCount: null
    };
    this.saveAuthentication = this.saveAuthentication.bind(this);
    this.setStateLogin = this.setStateLogin.bind(this);
    this.setStateAdminLogin = this.setStateAdminLogin.bind(this);
    this.setStateAdmin = this.setStateAdmin.bind(this);
    this.reloadCart = this.reloadCart.bind(this);
    this.checkStillLogin = this.checkStillLogin.bind(this);
  }
  //authentication

  setStateLogin(data, callback_function) {
    this.setState(
      {
        isLogin: data,
      },
      callback_function
    );
  }

  setStateAdmin(data) {
    this.setState({
      admin: data
    })
  }

  async reloadCart() {
    if (getCookie('login')) {
      const { sub } = jwt_decode(getCookie('login'));
      const cart = await findCart(sub);
      this.setState({
        cartCount: cart.products.length
      })
    }
  }

  async componentDidMount() {
    const cookie = getCookie('login');
    if (cookie) {
      const token = jwt_decode(cookie);
      console.log("authhhh", token.auth)
      if (token && token.auth === 'admin') {
        this.setStateAdminLogin(true);
        this.setStateAdmin({ uname: token.uname, id: token.sub })
      }
      if (token && token.auth === 'client') {
        this.setStateLogin({ uname: token.uname, id: token.sub })
      }
    }

    await this.reloadCart();
  }

  setStateAdminLogin(data, callback) {
    this.setState({
      isAdminLogin: data
    }, callback)
  }

  //save data token and Bearer
  saveAuthentication(Authentication, user_inform) {
    this.setState({
      Authentication: Authentication,
      user: user_inform,
    });
  }

  checkStillLogin() {
    if (getCookie('login')) {
      this.setStateLogin(true);
    } else {
      this.setStateLogin(false);
    }
    this.reloadCart();
  }

  render() {
    const { cartCount, isLogin, isAdminLogin, admin } = this.state;
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/">
              {<HomePage cartCount={cartCount} isLogin={isLogin}>
                <Slide />
                <Content />
              </HomePage>}
            </Route>
            <Route exact path='/product'>
              {<HomePage cartCount={cartCount} isLogin={isLogin}>
                <ShopPage checkStillLogin={this.checkStillLogin} isLogin={isLogin} />
              </HomePage>}
            </Route>
            <Route exact path='/cart' >
              {<HomePage cartCount={cartCount} isLogin={isLogin}>
                <Cart checkStillLogin={this.checkStillLogin} />
              </HomePage>}
            </Route>
            <UnAuthenRoute exact path='/product/:id'>
              <HomePage cartCount={cartCount} isLogin={isLogin} >
                <ProductDetails reloadCart={this.reloadCart} isLogin={isLogin} />
              </HomePage>
            </UnAuthenRoute>
            <UnAuthenRoute exact={true} isLogin={isLogin} path='/login'>
              <SignIn saveAuthentication={this.saveAuthentication} setStateLogin={this.setStateLogin} />
            </UnAuthenRoute>
          </Switch>
        </Router>


        {/* admin */}
        <Router>
          <Switch>
            <UnAuthenRoute isLogin={isAdminLogin} exact path='/admin/login'>
              <Navbar setStateAdminLogin={this.setStateAdminLogin}/>
              <Login setStateAdmin={this.setStateAdmin} setStateAdminLogin={this.setStateAdminLogin} />
            </UnAuthenRoute>
            <ProtectedRouteAdmin exact isLogin={isAdminLogin} path='/admin'>
              <Navbar setStateAdminLogin={this.setStateAdminLogin}/>
              <Sidebar admin={admin} />
              <Dashboard />
            </ProtectedRouteAdmin>
            <ProtectedRouteAdmin exact isLogin={isAdminLogin} path='/admin/dashboard'>
              <Navbar setStateAdminLogin={this.setStateAdminLogin}/>
              <Sidebar admin={admin} />
              <Dashboard />
            </ProtectedRouteAdmin>
            <ProtectedRouteAdmin exact isLogin={isAdminLogin} path='/admin/user'>
              <Navbar setStateAdminLogin={this.setStateAdminLogin}/>
              <Sidebar admin={admin} />
              <User />
            </ProtectedRouteAdmin>
            <ProtectedRouteAdmin exact isLogin={isAdminLogin} path='/admin/product'>
              <Navbar setStateAdminLogin={this.setStateAdminLogin}/>
              <Sidebar admin={admin} />
              <Product />
            </ProtectedRouteAdmin>
            <ProtectedRouteAdmin exact isLogin={isAdminLogin} path='/admin/order'>
              <Navbar setStateAdminLogin={this.setStateAdminLogin}/>
              <Sidebar admin={admin} />
              <Order />
            </ProtectedRouteAdmin>
          </Switch>
        </Router>
      </>
    );
  }
}

export default Hanu_Shoes;
