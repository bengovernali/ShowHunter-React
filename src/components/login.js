import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  login = async () => {
    const url = "http://localhost:3000/auth/spotify";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  };

  render() {
    return (
      <>
        {/* <Link  to={"/auth/spotify"}> */}
        <button onClick={this.login}>
          {/* /<img src="../images/spotify.svg" alt="spotify-login" /> */}
        </button>
        {/* </Link> */}
      </>
    );
  }
}

export default Login;
