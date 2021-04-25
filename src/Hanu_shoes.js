import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./view/homepage/hompage";
import UnAuthenRoute from './route/viewer_route/unAuthen_route';
import ProtectedRouteAdmin from './route/admin-route/ProtectedRouteAdmin';
import Login from './admin/login/Login';
import { getCookie } from './utils/utils'
// admin
import Navbar from './admin/navbar/Navbar';
import Sidebar from './admin/sidebar/Sidebar'
import Dashboard from './admin/dashboard/Dashboard'
import User from './admin/user/User'
import Product from './admin/product/Product'
import Order from './admin/order/Order'

// 
import jwt_decode from "jwt-decode";



import SignIn from './view/login/login';
class Hanu_Shoes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Authentication: "",
      user: {},
      admin: {},
      isLogin: false,
      isAdminLogin: false,
      completed: false
    };
    this.saveAuthentication = this.saveAuthentication.bind(this);
    this.setStateLogin = this.setStateLogin.bind(this);
    this.setStateAdminLogin = this.setStateAdminLogin.bind(this);
    this.setStateAdmin = this.setStateAdmin.bind(this);

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


  componentDidMount() {
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
  render() {
    const { isLogin, isAdminLogin, admin } = this.state;
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <UnAuthenRoute exact={true} isLogin={isLogin} path='/login'>
              <SignIn saveAuthentication={this.saveAuthentication} setStateLogin={this.setStateLogin} />
            </UnAuthenRoute>
          </Switch>
        </Router>


        {/* admin */}
        <Router>
          <Switch>
            <UnAuthenRoute isLogin={isAdminLogin} exact path='/admin/login'>
              <Navbar />
              <Login setStateAdmin={this.setStateAdmin} setStateAdminLogin={this.setStateAdminLogin} />
            </UnAuthenRoute>
            <ProtectedRouteAdmin exact isLogin={isAdminLogin} path='/admin'>
              <Navbar />
              <Sidebar admin={admin} />
              <Dashboard />
            </ProtectedRouteAdmin>
            <ProtectedRouteAdmin exact isLogin={isAdminLogin} path='/admin/dashboard'>
              <Navbar />
              <Sidebar admin={admin} />
              <Dashboard />
            </ProtectedRouteAdmin>
            <ProtectedRouteAdmin exact isLogin={isAdminLogin} path='/admin/user'>
              <Navbar />
              <Sidebar admin={admin} />
              <User />
            </ProtectedRouteAdmin>
            <ProtectedRouteAdmin exact isLogin={isAdminLogin} path='/admin/product'>
              <Navbar />
              <Sidebar admin={admin} />
              <Product />
            </ProtectedRouteAdmin>
            <ProtectedRouteAdmin exact isLogin={isAdminLogin} path='/admin/order'>
              <Navbar />
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
