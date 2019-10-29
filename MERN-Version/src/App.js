import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { slide as Menu } from 'react-burger-menu';

import logo from "./images/fmf-logo.png";
import logoTitle from "./images/fmf-logo2.png"

class App extends Component {
  render() {
    return (
        <div>
          <center>
            <img src={logoTitle} />
          </center>
        </div>


    );
  }
}

export default App;
