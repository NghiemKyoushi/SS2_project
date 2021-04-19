import React, { Component } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom'
import './Navbar.css'
class Navbar extends Component {
    render() {
        return <nav className="main-nav">
            <div className="logo">
                <Link to="/admin/dashboard">
                    <i className="fas fa-hospital-symbol"></i>
                    <span>HANU SHOES</span>
                </Link>
            </div>
            <div className="actions">
                <Link to="admin/login">
                    <ExitToAppIcon color="secondary" />
                </Link>
            </div>
        </nav>
    }
}

export default Navbar;