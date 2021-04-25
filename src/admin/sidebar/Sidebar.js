import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './Sidebar.css'
import HomeIcon from '@material-ui/icons/Home';
import AllInboxOutlinedIcon from '@material-ui/icons/AllInboxOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
const menus = [
    {
        title: "Dashboard",
        icon: <HomeIcon />,
        link: "/admin/dashboard"
    },
    {
        title: "Users",
        icon: <SupervisorAccountIcon />,
        link: "/admin/user"
    },
    {
        title: "Products",
        icon: <AllInboxOutlinedIcon />,
        link: "/admin/product"
    },
    {
        title: "Order",
        icon: <AssignmentTurnedInIcon />,
        link: "/admin/order"
    }
]

const temp_url = "https://www.wrraptheme.com/templates/lucid/hospital/assets/images/user.png";

class Sidebar extends Component {

    render() {
        return <aside className="side-bar">
            <div className="user-account">
                <img src={temp_url} alt="doctor-img" />
                <div>
                    <p>Welcome ,</p>
                    <a href="user" className="doctor-anchor">{this.props.admin.uname}</a>
                </div>
            </div>
            <Divider />
            <List>
                {menus.map((menu, index) => (
                    <ListItem button key={menu.title}>
                        <Link className="side-nav" to={menu.link}>
                            <ListItemIcon>{menu.icon}</ListItemIcon>
                            <ListItemText primary={menu.title} />
                        </Link>
                    </ListItem>
                ))}
            </List>
        </aside>
    }
}

export default Sidebar