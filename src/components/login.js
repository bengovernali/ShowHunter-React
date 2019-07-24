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
        <a href="http://localhost:3000/auth/spotify">Logn with spotify</a>
      </>
    );
  }
}

export default Login;
