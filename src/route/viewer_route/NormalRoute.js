import React, { Component } from 'react';
import { getCookie } from '../../utils/utils'

import { withRouter, Route } from 'react-router-dom';

class NormalRoute extends Component {
    componentDidMount() {
        console.log("normal")
        const { setStateLogin } = this.props;
        if (getCookie('login')) {
            setStateLogin(true);
        } else {
            setStateLogin(false);
        }
    }

    render() {
        const { children } = this.props;
        return <Route>{children}</Route>
    }
}

export default NormalRoute;