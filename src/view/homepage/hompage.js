import React from 'react';

import Header from '../../component/header/header';
import Navigation from '../../component/nav/nav';
import Footer from '../../component/footer/footer';
import Slide from '../../component/slide/slide';
import Content from '../../component/content/content';
class HomePage extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <>
                <Navigation/>
                <Header/>
                <Slide/>
                <Content/>
                <Footer/>
            </>

        )
    }
}
export default HomePage;