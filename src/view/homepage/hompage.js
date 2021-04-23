import React from 'react';

import Header from '../../component/header/header';
import Navigation from '../../component/nav/nav';
import Footer from '../../component/footer/footer';
import Slide from '../../component/slide/slide';
import { withRouter } from 'react-router';
class HomePage extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        const {isLogin, children} = this.props;
        return(
            <>
                {/* <Navigation/> */}
                <Header isLogin = {isLogin}/>
                <div style ={{height: "70px"}}></div>
                {children}
                <Footer/>
            </>

        )
    }
}
export default withRouter(HomePage);