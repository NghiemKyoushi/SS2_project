import React from 'react';
import { withRouter, Route } from 'react-router-dom';

class UnAuthenRoute extends React.Component {

  componentDidMount() {
  }
  render() {
    const { isLogin, path, exact, children } = this.props;
    if (isLogin) {
      this.props.history.goBack();
      return null;
    } else {
      return (
        <Route
          {...this.props}
          exact={exact}
          to={path}>
          {children}
        </Route>
      );
    }
  }
}

export default withRouter(UnAuthenRoute);