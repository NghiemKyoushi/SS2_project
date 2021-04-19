import React from "react";

import jwt_decode from "jwt-decode";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import {Link } from "react-router-dom";
//import function
import {setCookie, getCookie} from '../../utils/utils'
import { Login } from "../../utils/utils";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      'Hanu_shoes © '
      
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = (theme) => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      fetchedData: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    console.log("login");
    const message = Login(username, password)
      .then( function(res) {
        console.log("Vaooooooooo",res.data)
        if(res.data.message === "login successfully"){
          // setCookie("username", res.data.config.username, 100);
          // setCookie("username", res.data.username, 100);

          // this.props.setStateLogin(true, () => {
          //   this.props.history.push("/");
          // })
          // this.setState({
          //   fetchedData: true
          // })
          
        }else {
          alert("login false")
        }
      })
      if(getCookie("login")){
        const login = getCookie('login');
          const decode = jwt_decode(login);
          console.log("decode", decode)
      }
     
      // if(this.state.fetchedData){
      //    this.props.setStateLogin(true, () => {
      //       this.props.history.push("/");
      //    })
      // }
  }


  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    // console.log("props day",this.props);

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Link to='/'><Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          </Link>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="UserName"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={this.onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.onChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}


export default withStyles(useStyles) (withRouter(SignIn));
