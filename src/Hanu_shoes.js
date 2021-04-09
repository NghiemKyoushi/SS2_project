import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./view/homepage/hompage";
import UnAuthenRoute from './route/viewer_route/unAuthen_route';
import SignIn from './view/login/login';
class Hanu_Shoes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Authentication: "",
      user: {},
      isLogin: false,
    };
    this.saveAuthentication = this.saveAuthentication.bind(this);
    this.setStateLogin = this.setStateLogin.bind(this);
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
     //save data token and Bearer
     saveAuthentication(Authentication, user_inform) {
      this.setState({
        Authentication: Authentication,
        user: user_inform,
      });
    }
  render() {
    const {isLogin} = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <UnAuthenRoute exact = {true} isLogin= {isLogin} path = '/login'>
          <SignIn saveAuthentication = {this.saveAuthentication} setStateLogin = {this.setStateLogin} />
          </UnAuthenRoute>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Hanu_Shoes;
