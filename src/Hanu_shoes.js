import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./view/homepage/hompage";
//Route
import UnAuthenRoute from './route/viewer_route/unAuthen_route';
import ProtectedRoute from './route/user_route/ProtectedRoute';

//__________________________
import SignIn from './view/login/login';
import ShopPage from './view/shopPage/shopPage';
import ProductDetails from './view/productDetails/productDetails';
import Content from './component/content/content';
import Slide from './component/slide/slide';

import {getCookie} from './utils/fetchData';
import Cart from './view/cart/cart';
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
    componentDidMount() {
      const username = getCookie("username");
      // const login = getCookie("login");

      if(username){
        console.log("user in page")
        this.setState({
          isLogin: true 
        })
      }else {
        console.log("not user in page")
        this.setState({
          isLogin: false
        })
      }
    }
  render() {
    const {isLogin} = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <HomePage  isLogin = {isLogin}>
            <Slide/>
              <Content/>
            </HomePage>
          </Route>
          <Route exact path ='/product'>
          <HomePage  isLogin = {isLogin}>
          <ShopPage  isLogin = {isLogin} />
          </HomePage>
          </Route>

          <Route exact path ='/cart'>
          <HomePage  isLogin = {isLogin}>
          <Cart/>
          </HomePage>
          </Route>
          <UnAuthenRoute  exact path ='/product/:id'>
          <HomePage isLogin = {isLogin} >
          <ProductDetails/>
          </HomePage>
          </UnAuthenRoute>

          <UnAuthenRoute exact = {true} isLogin= {isLogin} path = '/login'>
          <SignIn saveAuthentication = {this.saveAuthentication} setStateLogin = {this.setStateLogin} />
          </UnAuthenRoute>

        </Switch>
      </BrowserRouter>
    );
  }
}

export default Hanu_Shoes;
