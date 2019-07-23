import React, { Component } from "react";
import logo from "../images/logo2.png";
import Login from "./login";

class Home extends Component {
  render() {
    return (
      <>
        <Login />
        <img className="home-logo" src={logo} alt="showhunter logo" />
      </>
    );
  }
}

export default Home;
