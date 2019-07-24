import React, { Component } from "react";
import logo from "../images/logo2.png";
import queryString from "query-string";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    bearer: ""
  };

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    const bearer = values.bearer;
    this.setState({
      bearer
    });
  }

  render() {
    return (
      <>
        {!!this.state.bearer ? (
          <Redirect
            to={{
              pathname: "/home",
              state: { bearer: this.state.bearer }
            }}
          />
        ) : (
          <>
            <img className="home-logo" src={logo} alt="showhunter logo" />
            <button>
              <a href="http://localhost:3000/auth/spotify">
                Login With Spotify
              </a>
            </button>
          </>
        )}
      </>
    );
  }
}

export default Login;
