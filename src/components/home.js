import React, { Component } from "react";

class Home extends Component {
  state = {
    bearer: ""
  };

  async componentDidMount() {
    const token = this.props.location.state.bearer;
    await this.setState({
      bearer: token
    });
  }

  onClick() {
    fetch("http://localhost:3000/auth/scan");
  }

  render() {
    return (
      <>
        <h1>This is the homepage</h1>
        <button onClick={this.onClick}>Scan Spotify</button>
      </>
    );
  }
}

export default Home;
