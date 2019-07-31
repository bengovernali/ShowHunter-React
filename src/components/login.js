import React, { Component } from "react";
import logo from "../images/logo2.png";
import queryString from "query-string";
import spotifyLogo from "../images/spotify2.svg";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    token: "",
    tokenId: ""
  };

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    const tokenId = values.tokenId;

    this.setState({
      tokenId: tokenId
    });
  }

  render() {
    return (
      <div className="login-page">
        {!!this.state.tokenId ? (
          <Redirect
            to={{
              pathname: "/home",
              state: { tokenId: this.state.tokenId }
            }}
          />
        ) : (
          <>
            <img className="home-logo" src={logo} alt="showhunter logo" />

            <a className="login-link" href="http://localhost:3000/auth/spotify">
              Login With Spotify
            </a>
          </>
        )}
      </div>
    );
  }
}

export default Login;
