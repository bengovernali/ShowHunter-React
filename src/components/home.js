import React, { Component } from "react";
import Loading from "./loading";
import Card from "./card";

class Home extends Component {
  state = {
    tokenId: "",
    artist: "",
    zip: "",
    radius: "",
    events: [],
    loading: false,
    loaded: false
  };

  async componentDidMount() {
    const tokenId = this.props.location.state.tokenId;
    await this.setState({
      tokenId: tokenId
    });
  }

  handleArtistChange = e => {
    this.setState({
      artist: e.target.value
    });
  };

  handleZipChange = e => {
    this.setState({
      zip: e.target.value
    });
  };

  handleRadiusChange = e => {
    this.setState({
      radius: e.target.value
    });
  };

  runLoadIcon = () => {
    this.setState({
      loading: true,
      events: [],
      loaded: false
    });
    console.log("LOADING ", this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.runLoadIcon();
    const artist = this.state.artist;
    const zip = this.state.zip;
    const radius = this.state.radius;
    const tokenId = this.state.tokenId;
    const url = `http://localhost:3000/home/scan/${tokenId}/${artist}/${zip}/${radius}`;
    fetch(url)
      .then(response => response.json())
      .then(result => result)
      .then(result => {
        const write = result.events.length === 0 ? [] : result;
        console.log("Write: ", write);
        this.setState({
          events: write,
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
            name="artist"
          />
          <input
            type="text"
            placeholder="Please Enter Your Zip Code"
            onChange={this.handleZipChange}
            name="zip"
          />
          <select value={this.state.value} onChange={this.handleRadiusChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
        {!!loading ? <Loading /> : null}
        {!!events.events && !!loaded ? (
          <div className="card-container">
            {events.events.map(event => {
              return (
                <Card
                  key={`${event.name}${event.venue}`}
                  className="card"
                  name={`${event.name}`}
                  venue={`${event.venue}`}
                  date={`${event.date}`}
                  time={`${event.time}`}
                  image={`${event.image}`}
                  url={`${event.url}`}
                />
              );
            })}
          </div>
        ) : !events.events && !!loaded ? (
          <p>
            There are no upcoming events in your area for this band's related
            artists
          </p>
        ) : null}
      </>
    );
  }
}

export default Home;

/*
<form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Please Enter an Artist"
            onChange={this.handleArtistChange}
            name="artist"
          />
          <input type="submit" value="Submit" />
        </form>
        */
