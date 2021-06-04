import React, { Component } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, withRouter } from 'react-router-dom'
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
                <Link to="admin/login" onClick={() => {
                    document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    this.props.setStateAdminLogin(false, () => {
                        this.props.history.push("/admin/login");
                    })
                }}>
                    <ExitToAppIcon color="secondary" />
                </Link>
            </div>
        </nav>
    }
}

export default withRouter(Navbar);