import React, { Component } from "react";
import logo from "../images/logo2.png";

class Login extends Component {
  render() {
    return (
      <>
        <img className="home-logo" src={logo} alt="showhunter logo" />
        <button>
          <a href="http://localhost:3000/auth/spotify">Login With Spotify</a>
        </button>
      </>
    );
  }
}

export default Login;
