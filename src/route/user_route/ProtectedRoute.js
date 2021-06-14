 /* eslint-disable */
import React, { Component } from 'react'
import { withRouter, Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends Component {
    render() {
        const { isLogin, path, children, exact } = this.props;
        return <Route exact={exact} to={path} {...this.props}>
            {isLogin ? children : <Redirect push to="/login" />}
        </Route>
    }
}

export default withRouter(ProtectedRoute);