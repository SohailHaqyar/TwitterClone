import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useAuthDataContext } from "./../contexts/AuthContext";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    "& span": { color: "#fff" },
  },
  menuButton: {
    marginRight: 30,
  },
  container: {
    width: "80%",
    alignSelf: "center",
  },
  link: { textDecoration: "none" },
});

const signedIn = () => (
  <React.Fragment>
    <Link to="/">
      <Button color="inherit">Home</Button>
    </Link>

    <Link to="/posts">
      <Button color="inherit">Posts</Button>
    </Link>
    <Link to="/todos">
      <Button color="inherit">Todos</Button>
    </Link>
  </React.Fragment>
);

const signedOut = () => (
  <React.Fragment>
    <Link to="/login">
      <Button color="default">Login</Button>
    </Link>
    <Link to="/register">
      <Button color="default">Register</Button>
    </Link>
  </React.Fragment>
);

export const Navbar = () => {
  const classes = useStyles();
  const { username: authData } = useAuthDataContext();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.container}>
          {!authData ? signedOut() : signedIn()}
        </Toolbar>
      </AppBar>
    </div>
  );
};
