import React, { Component } from "react";

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
        <button onClick={this.login}>
          Login with Spotify
          {/* /<img src="../images/spotify.svg" alt="spotify-login" /> */}
        </button>
      </>
    );
  }
}

export default Login;
