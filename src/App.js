import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Decrypt from './components/Decrypt'
import Encrypt from './components/Encrypt'

import { makeStyles } from '@material-ui/core/styles';
//import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import HttpsIcon from '@material-ui/icons/Https';
import NoEncryptionIcon from '@material-ui/icons/NoEncryption';

import './App.css';
const useStyles = makeStyles(theme => ({
  styleGrid: {
    paddingTop: "20px",
    color: "#017575"
  },
  listStyle: {
    display: "flex",
    justifyContent: "space-around"
  },
  rootNav: {
    '& > * + *': {
      marginLeft: theme.spacing(20)
    },
    fontSize: "20px",
    borderBottom: "0.5px grey solid",
    borderRadius: "5px"
  },
  navStyleEncrypt: {
    textDecoration: "none",
    color: "#09165f",
    backgroundColor: "#4781c30a",
    borderRadius: "3px",
    height: "16px",
    width: "100px"
  },
  navStyleDecrypt: {
    textDecoration: "none",
    color: "#7d1111",
    backgroundColor: "#4781c30a",
    borderRadius: "3px",
    height: "16px",
    width: "100px"
  }
}));


function App() {
  const classes = useStyles();
  return (
    <div className={"App " + classes.styleGrid}>

      <Router>
        <header style={{ position: "fixed", width: "100%" }}>
          <Typography className={classes.rootNav}>
            <Link to="/encrypt" color="primary" className={classes.navStyleEncrypt} >
              <HttpsIcon />Encrypt
          </Link>
            <Link to="/decrypt" color="secondary" className={classes.navStyleDecrypt}>
              <NoEncryptionIcon />Decrypt
          </Link>
          </Typography>
        </header>
        <br />
        <br />
        <br />
        <Route exact path="/" component={Decrypt} />
        <Route path="/decrypt" component={Decrypt} />
        <Route path="/encrypt" component={Encrypt} />
      </Router>
    </div>
  );
}

export default App;
