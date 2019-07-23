import React, { Component } from "react";
import PropTypes from "prop-types";

import PopupWindow from "./PopupWindow";
import { toQuery } from "./utils";

class SpotifyLogin extends Component {
  state = {
    bearer: "",
    artists: []
  };

  static propTypes = {
    buttonText: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    clientId: PropTypes.string.isRequired,
    onRequest: PropTypes.func,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    redirectUri: PropTypes.string.isRequired,
    scope: PropTypes.string
  };

  static defaultProps = {
    buttonText: "Sign in with Spotify",
    scope: "user-library-read",
    onRequest: () => {},
    onSuccess: () => {},
    onFailure: () => {}
  };

  onBtnClick = () => {
    const { clientId, scope } = this.props;
    const search = toQuery({
      client_id: clientId,
      scope,
      redirect_uri: "http://localhost:3001/callback",
      response_type: "token"
    });
    const popup = (this.popup = PopupWindow.open(
      "spotify-authorization",
      `https://accounts.spotify.com/authorize?${search}`,
      { height: 1000, width: 600 }
    ));

    this.onRequest();
    popup.then(data => this.onSuccess(data), error => this.onFailure(error));
  };

  onRequest = () => {
    this.props.onRequest();
  };

  onSuccess = async data => {
    console.log(data);
    if (!data.access_token) {
      return this.onFailure(new Error("'access_token' not found"));
    }

    this.getTracks(data);
  };

  getTracks = async data => {
    const url = "https://api.spotify.com/v1/me/tracks?offeset=20&limit=50";
    const bearer = data.access_token;

    try {
      let response = await fetch(url, {
        headers: {
          Authorization: `Authorization: Bearer ${bearer}`
        }
      });
      console.log(response);
      let json = await response.json();
      console.log(json);
      return json;
    } catch (err) {
      return err.message;
    }
  };

  onFailure = error => {
    this.props.onFailure(error);
  };

  render() {
    const { className, buttonText, children } = this.props;
    const attrs = { onClick: this.onBtnClick };

    if (className) {
      attrs.className = className;
    }

    return <button {...attrs}>{children || buttonText}</button>;
  }
}

export default SpotifyLogin;
