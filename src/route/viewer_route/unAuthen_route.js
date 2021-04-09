import React from 'react';
import {  withRouter,Route } from 'react-router-dom';


class UnAuthenRoute extends React.Component{

  componentDidMount(){
    console.log("unauthen")
  }
  render(){
    const {isLogin, path,exact,children} = this.props;
    console.log("isLogin: ", isLogin)
    if(isLogin){
      console.log("goback")
      this.props.history.goBack();
      return null;
    }else{
      console.log("not goback")
      return  (
        <Route
        {...this.props}
        exact ={exact}
        to ={path}>
         {children}
        </Route>
      );
    }
  }
}

export default withRouter(UnAuthenRoute);