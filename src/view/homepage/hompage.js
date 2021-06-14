 /* eslint-disable */
import React from 'react';

import Header from '../../component/header/header';
import Navigation from '../../component/nav/nav';
import Footer from '../../component/footer/footer';
import Slide from '../../component/slide/slide';
import { withRouter } from 'react-router';
class HomePage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { isLogin, children, cartCount } = this.props;
        return (
            <>
                {/* <Navigation/> */}
                <Header cartCount={cartCount} isLogin={isLogin} />
                <div style={{ height: "55px" }}></div>
                {children}
                <Footer />
            </>

        )
    }
}
export default withRouter(HomePage);