import React, { Component } from "react";

class Home extends Component {
  state = {
    token: "",
    artist: ""
  };

  async componentDidMount() {
    const token = this.props.location.state.bearer;
    await this.setState({
      token: token
    });
  }

  /*
  onClick = () => {
    fetch(`http://localhost:3000/home/scan/${this.state.bearer}`);
  };
  */

  handleArtistChange = e => {
    this.setState({
      artist: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const artist = this.state.artist;
    const token = this.state.token;
    const url = `http://localhost:3000/home/scan/${token}/${artist}`;
    fetch(url);
  };

  render() {
    return (
      <>
        <h1>This is the homepage</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Please Enter an Artist"
            onChange={this.handleArtistChange}
            name="title"
            value={this.state.title}
          />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default Home;

//?bearer=${token}
