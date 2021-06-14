 /* eslint-disable */
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, withRouter, NavLink } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import './Login.css'
import Button from '@material-ui/core/Button';
import { getCookie } from '../../utils/utils';
const axios = require('axios');
axios.defaults.withCredentials = true;
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            status: ""
        }
        this.fetchData = this.fetchData.bind(this);
        this.usernameOnChange = this.usernameOnChange.bind(this);
        this.passwordOnChange = this.passwordOnChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async fetchData(e) {
        const { username, password } = this.state
        const req = {
            username: username,
            password: password
        }
        try {
            const res = await axios.post('http://localhost:8090/login', req);
            if (res.data.isAuthen) {
                this.setState({
                    status: "correct"
                })
            } else {
                this.setState({
                    status: "wrong"
                })
            }
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }

    usernameOnChange() {
        const username_input = document.querySelector("#username").value;
        this.setState({
            username: username_input
        })
    }

    passwordOnChange() {
        const password_input = document.querySelector("#password").value;
        this.setState({
            password: password_input
        })
    }

    async onSubmit(event) {
        event.preventDefault();
        const { username, password } = this.state
        const req = {
            username: username,
            password: password
        }
        try {
            const { data } = await axios({
                method: 'post',
                url: 'http://localhost:3030/login',
                data: { username: username, password: password },
                credentials: 'include'
            })
            if (data.admin === true) {
                this.props.setStateAdminLogin(true, () => {
                    this.props.history.push("/admin/dashboard");
                })
            }
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }

    render() {
        const { status } = this.state;
        return <div className="login">
            <form className="form" onSubmit={this.onSubmit}>
                <Typography variant="h4" gutterBottom>
                    Login H-Shoes Admin
                </Typography>
                <TextField id="outlined-basic" label="Username" id='username' variant="outlined" onInput={this.usernameOnChange} />
                <TextField id="outlined-basic" label="Password" type='password' id='password' variant="outlined" onInput={this.passwordOnChange} />
                <Button variant="contained" id="green-text" type='submit'>
                    Log In
                </Button>
            </form>
        </div>
    }
}

export default withRouter(Login);