import React, { Component } from "react";

class Home extends Component {
  state = {
    token: "",
    tokenId: "",
    artist: ""
  };

  async componentDidMount() {
    const token = this.props.location.state.token;
    const tokenId = this.props.location.state.tokenId;
    await this.setState({
      token: token,
      tokenId: tokenId,
      events: [],
      loading: false
    });
  }

  handleArtistChange = e => {
    this.setState({
      artist: e.target.value
    });
  };

  runLoadIcon = () => {
    this.setState({
      loading: true
    });
    console.log("LOADING ", this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.runLoadIcon();
    const artist = this.state.artist;
    const token = this.state.token;
    const tokenId = this.state.tokenId;
    const url = `http://localhost:3000/home/scan/${token}/${tokenId}/${artist}`;
    fetch(url)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({
          events: result,
          loading: false
        });
      })
      .then(() => console.log(this.state));
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
