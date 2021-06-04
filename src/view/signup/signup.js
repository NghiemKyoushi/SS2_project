import React from "react";
import axios from 'axios';

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
//fetch data

import { Register } from '../../utils/utils'
import { withRouter } from "react-router";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Hanu_Airline © "}
      {/* <Link color="inherit" href="https://material-ui.com/">
        
      </Link> */}
      {new Date().getFullYear()}
    </Typography>
  );
}

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // name: "",
      username: "",
      email: "",
      // imageUrl: "",
      password: ""
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  async onSubmit(e) {
    e.preventDefault();
    console.log("suppppppppp");
    const {username, email, password} = this.state;
    const body = {
      username: username,
      email: email,
      password: password
    }
    const url = "http://localhost:3030/register";
    try {
      const postData = await axios.post(url, body)
      if (postData) {
        this.props.history.push('/login');
      }
    } catch (e) {
      // const message = "SignUp_false";
      // return message;
      alert("false")
    }
    // const message = Register(this.state).then(res =>
    //   console.log(res.data)
    // )
    // if (message.data.message) {
    //   alert("register successfully, come to login")
    // } else {
    //   alert("Register false")
    // }
    // {success: true, message: "User registered successfully"}
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  size="small"
                  autoComplete="uname"
                  name="usernameOrEmail"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  type="text"

                  label="Username"
                  autoFocus
                  onChange={this.onChange}

                />
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={this.onChange}

                />
              </Grid>
             
            
              <Grid item xs={12}>
                <TextField
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.onChange}

                />
              </Grid>
            
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSubmit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }

}

export default withStyles(styles) (withRouter(SignUp));
