import React, { Component } from "react";
import Loading from "./loading";
import Card from "./card";

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
      loading: false,
      loaded: false
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
          loading: false,
          loaded: true
        });
      })
      .then(() => console.log(this.state));
  };

  render() {
    const loading = this.state.loading;
    const events = this.state.events;
    const loaded = this.state.loaded;
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
        {!!loading ? <Loading /> : null}
        {!!events && !!loaded ? (
          <div className="card-container">
            {events.events.map(event => {
              return (
                <Card
                  className="card"
                  name={`${event.name}`}
                  venue={`${event.venue}`}
                  date={`${event.date}`}
                  time={`${event.time}`}
                />
              );
            })}
          </div>
        ) : (
          <p>
            There are no upcoming events in your area for this band's related
            artists
          </p>
        )}
      </>
    );
  }
}

export default Home;
